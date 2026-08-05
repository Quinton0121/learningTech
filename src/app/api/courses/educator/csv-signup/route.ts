import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role !== 'EDUCATOR' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;

    if (!file || !courseId) {
      return NextResponse.json({ error: 'Missing file or courseId' }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });
    
    if (!course || course.educatorId !== decoded.userId) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    const text = await file.text();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV is empty or missing data rows' }, { status: 400 });
    }

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    const required = ['name', 'studentid', 'email', 'password', 'pcid'];
    for (const reqCol of required) {
      if (!headers.includes(reqCol)) {
        return NextResponse.json({ error: `Missing required column: ${reqCol}` }, { status: 400 });
      }
    }

    const nameIdx = headers.indexOf('name');
    const studentIdIdx = headers.indexOf('studentid');
    const emailIdx = headers.indexOf('email');
    const passwordIdx = headers.indexOf('password');
    const pcIdIdx = headers.indexOf('pcid');

    let successCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < headers.length) continue;

      const name = cols[nameIdx];
      const studentId = cols[studentIdIdx];
      const email = cols[emailIdx] || null;
      const password = cols[passwordIdx];
      const pcId = cols[pcIdIdx] || null;

      if (!studentId || !password) continue;

      let user = null;
      if (email) {
        user = await prisma.user.findUnique({ where: { email } });
      }
      if (!user && studentId) {
        user = await prisma.user.findUnique({ where: { studentId } });
      }

      if (!user) {
        const passwordHash = await bcrypt.hash(password, 10);
        const trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 30);
        
        user = await prisma.user.create({
          data: {
            name,
            studentId,
            email,
            passwordHash,
            role: 'LEARNER',
            authType: 'EMAIL',
            mustChangePassword: true,
            trialExpiresAt
          }
        });
      }

      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId
          }
        },
        update: {
          pcId: pcId
        },
        create: {
          userId: user.id,
          courseId: courseId,
          pcId: pcId,
          status: 'APPROVED'
        }
      });

      successCount++;
    }

    return NextResponse.json({ message: `Successfully registered ${successCount} students and assigned PCs.` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
