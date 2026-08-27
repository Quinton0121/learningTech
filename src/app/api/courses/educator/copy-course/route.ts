import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    const educator = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!educator || (educator.role !== 'EDUCATOR' && educator.role !== 'ADMIN')) {
       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { courseId } = await request.json();
    if (!courseId) return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    
    const originalCourse = await prisma.course.findFirst({
      where: { id: courseId, educatorId: educator.id }
    });
    
    if (!originalCourse) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    // Link the new course to the root quota group
    const rootQuotaId = originalCourse.sharedQuotaGroupId || originalCourse.id;

    const newCourse = await prisma.course.create({
      data: {
        title: originalCourse.title + ' (Copy)',
        description: originalCourse.description,
        educatorId: educator.id,
        isPublic: false,
        priceTokens: originalCourse.priceTokens,
        studentQuota: originalCourse.studentQuota, // Actually irrelevant since we use the shared pool, but keep for fallback
        sharedQuotaGroupId: rootQuotaId
      }
    });

    return NextResponse.json({ success: true, course: newCourse }, { status: 200 });

  } catch (error) {
    console.error('Copy course error:', error);
    return NextResponse.json({ error: 'Failed to copy course' }, { status: 500 });
  }
}
