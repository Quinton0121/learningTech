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
    
    const { courseId, isPublic } = await request.json();
    
    const course = await prisma.course.findFirst({ where: { id: courseId, educatorId: decoded.userId }});
    if (!course) {
       return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    if (course.isArchived) {
      return NextResponse.json({ error: 'Archived courses cannot be modified' }, { status: 400 });
    }

    await prisma.course.update({
      where: { id: courseId },
      data: { isPublic: isPublic }
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to toggle visibility' }, { status: 500 });
  }
}
