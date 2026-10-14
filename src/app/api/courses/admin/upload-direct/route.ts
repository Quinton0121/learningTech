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
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const educatorId = formData.get('educatorId') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing file or title' }, { status: 400 });
    }

    const rawHtml = await file.text();
    if (!rawHtml || rawHtml.trim().length === 0) {
      return NextResponse.json({ error: 'Uploaded HTML file is empty' }, { status: 400 });
    }

    const sanitized = sanitizeAndPrepareCourseHtml(rawHtml);

    const course = await prisma.course.create({
      data: {
        title: title,
        description: description || 'Directly uploaded by admin',
        educatorId: educatorId || user.id,
        isActive: true,
        isPublic: true,
        htmlContent: sanitized.html
      }
    });

    return NextResponse.json({
      message: sanitized.repaired
        ? 'Course successfully uploaded and auto-repaired to comply with sync rules!'
        : 'Course successfully uploaded!',
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
