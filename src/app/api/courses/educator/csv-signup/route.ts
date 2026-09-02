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
    
    if (!course || (course.educatorId !== decoded.userId && decoded.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    let text = await file.text();
    // Remove UTF-8 BOM if present
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.slice(1);
    }
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV is empty or missing data rows' }, { status: 400 });
    }

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/[\s_"-]/g, ''));
    
    const required = ['name', 'studentid', 'email', 'password', 'pcid'];
    for (const reqCol of required) {
      if (!headers.includes(reqCol)) {
        return NextResponse.json({ error: `Missing required column: ${reqCol}. Required columns: name, studentId, email, password, pcId` }, { status: 400 });
      }
    }

    const nameIdx = headers.indexOf('name');
    const studentIdIdx = headers.indexOf('studentid');
    const emailIdx = headers.indexOf('email');
    const passwordIdx = headers.indexOf('password');
    const pcIdIdx = headers.indexOf('pcid');

    let successCount = 0;
    let newUsersCount = 0;
    let updatedUsersCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const rawCols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (rawCols.length < headers.length) continue;

      const name = rawCols[nameIdx];
      const studentId = rawCols[studentIdIdx];
      const email = rawCols[emailIdx] || null;
      const password = rawCols[passwordIdx];
      const pcId = rawCols[pcIdIdx] || null;

      if (!studentId && !email) continue;

      let user = null;
      if (email) {
        user = await prisma.user.findUnique({ where: { email } });
      }
      if (!user && studentId) {
        user = await prisma.user.findUnique({ where: { studentId } });
      }

      if (!user) {
        const passwordHash = password ? await bcrypt.hash(password, 10) : await bcrypt.hash('12345678', 10);
        const trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 365);
        
        user = await prisma.user.create({
          data: {
            name: name || studentId,
            studentId,
            email,
            passwordHash,
            role: 'LEARNER',
            authType: 'EMAIL',
            mustChangePassword: true,
            trialExpiresAt
          }
        });
        newUsersCount++;
      } else {
        // User already exists: update any modified details from the CSV
        const updateData: any = {};
        if (name && user.name !== name) updateData.name = name;
        if (studentId && user.studentId !== studentId) updateData.studentId = studentId;
        if (email && user.email !== email) updateData.email = email;
        if (password) {
          updateData.passwordHash = await bcrypt.hash(password, 10);
        }

        if (Object.keys(updateData).length > 0) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: updateData
          });
          updatedUsersCount++;
        }
      }

      // Upsert enrollment: re-approve and update pcId
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId
          }
        },
        update: {
          pcId: pcId,
          status: 'APPROVED' // Re-approve if student was previously removed
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

    return NextResponse.json({ 
      success: true,
      message: `Successfully synced ${successCount} students (${newUsersCount} new, ${updatedUsersCount} updated).`,
      count: successCount,
      newUsers: newUsersCount,
      updatedUsers: updatedUsersCount
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

