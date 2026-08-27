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
    
    const { courseId, newTitle } = await request.json();
    if (!courseId || !newTitle) {
      return NextResponse.json({ error: 'Course ID and new title required' }, { status: 400 });
    }
    
    // Check ownership
    const course = await prisma.course.findFirst({
      where: { id: courseId, educatorId: decoded.userId }
    });
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    // Update course
    await prisma.course.update({
      where: { id: courseId },
      data: { title: newTitle }
    });

    return NextResponse.json({ success: true, message: 'Course renamed' }, { status: 200 });
  } catch (error) {
    console.error('Rename course error:', error);
    return NextResponse.json({ error: 'Failed to rename course' }, { status: 500 });
  }
}
