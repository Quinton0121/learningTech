import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
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
    
    const { courseId, studentId } = await request.json();
    
    if (!courseId || !studentId) {
      return NextResponse.json({ error: 'Missing courseId or studentId' }, { status: 400 });
    }

    // Verify course belongs to this educator or user is ADMIN
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        ...(decoded.role === 'ADMIN' ? {} : { educatorId: decoded.userId })
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    // 1. Permanently delete the enrollment record
    await prisma.enrollment.deleteMany({
      where: {
        userId: studentId,
        courseId: course.id
      }
    });

    // 2. Invalidate student session token immediately
    await prisma.user.updateMany({
      where: { id: studentId },
      data: { sessionToken: null }
    });

    // 3. If student has no other enrollments and is a LEARNER, delete the user record to leave zero trace
    const remainingEnrollments = await prisma.enrollment.count({
      where: { userId: studentId }
    });

    if (remainingEnrollments === 0) {
      await prisma.user.deleteMany({
        where: {
          id: studentId,
          role: 'LEARNER'
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Student record permanently deleted without trace.' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Delete student error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete student' }, { status: 500 });
  }
}
