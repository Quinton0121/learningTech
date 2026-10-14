import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { sanitizeAndPrepareCourseHtml } from '@/lib/courseHtmlSanitizer';

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

    const rawHtml = await file.text();
    if (!rawHtml || rawHtml.trim().length === 0) {
      return NextResponse.json({ error: 'Uploaded HTML file is empty' }, { status: 400 });
    }

    const sanitized = sanitizeAndPrepareCourseHtml(rawHtml);

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        htmlContent: sanitized.html
      }
    });

    return NextResponse.json({
      message: sanitized.repaired
        ? 'Course HTML updated and auto-repaired to comply with sync rules!'
        : 'Course HTML successfully updated!',
      course,
      diagnostics: {
        slideCount: sanitized.slideCount,
        repaired: sanitized.repaired,
        repairsApplied: sanitized.repairsApplied
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
