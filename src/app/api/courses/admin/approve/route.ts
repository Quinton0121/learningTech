import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
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
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied: Requires Admin role' }, { status: 403 });
    }

    const { courseId, action } = await req.json();

    const txtFile = path.join(process.cwd(), 'public', 'pending_courses', `${courseId}.txt`);
    const htmlFile = path.join(process.cwd(), 'public', 'courses', `${courseId}.html`);

    if (action === 'APPROVE') {
      if (fs.existsSync(txtFile)) {
        fs.renameSync(txtFile, htmlFile);
      }
      await prisma.course.update({
        where: { id: courseId },
        data: { isActive: true }
      });
      return NextResponse.json({ message: 'Course approved successfully' });
    } else if (action === 'REJECT') {
      if (fs.existsSync(txtFile)) {
        fs.unlinkSync(txtFile);
      }
      await prisma.course.delete({ where: { id: courseId } });
      return NextResponse.json({ message: 'Course rejected and deleted' });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


