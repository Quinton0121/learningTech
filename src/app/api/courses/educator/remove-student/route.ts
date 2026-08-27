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
    
    const { courseId, studentId } = await request.json();
    
    // Verify course belongs to this educator
    const course = await prisma.course.findFirst({ where: { id: courseId, educatorId: decoded.userId }});
    if (!course) {
       return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    // Mark enrollment as removed
    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: studentId,
          courseId: course.id
        }
      },
      data: {
        status: 'REMOVED'
      }
    });

    return NextResponse.json({ success: true, message: 'Student removed from class.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to remove student' }, { status: 500 });
  }
}
