import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

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

    const formData = await req.formData();
    const courseId = formData.get('courseId') as string;
    const file = formData.get('file') as File;

    if (!courseId || !file) {
      return NextResponse.json({ error: 'Missing courseId or file' }, { status: 400 });
    }

    const htmlContent = await file.text();

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        htmlContent: htmlContent
      }
    });

    return NextResponse.json({ message: 'Course HTML successfully updated and sync code auto-injected!', course });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
