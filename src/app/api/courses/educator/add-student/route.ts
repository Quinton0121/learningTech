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
    
    // Check if the caller is an educator
    const educator = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!educator || (educator.role !== 'EDUCATOR' && educator.role !== 'ADMIN')) {
       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { courseId, studentEmail } = await request.json();
    if (!studentEmail) return NextResponse.json({ error: 'Student email required' }, { status: 400 });
    
    // Find the student
    const student = await prisma.user.findUnique({ where: { email: studentEmail } });
    if (!student) {
      return NextResponse.json({ error: 'Student email not found in system.' }, { status: 404 });
    }
    
    // Verify course belongs to this educator
    const course = await prisma.course.findFirst({ where: { id: courseId, educatorId: educator.id }});
    if (!course) {
       return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 });
    }

    // Enroll student if not already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: student.id, courseId: course.id } }
    });

    if (existing) {
      return NextResponse.json({ error: 'Student is already enrolled.' }, { status: 400 });
    }

    await prisma.enrollment.create({
      data: {
        userId: student.id,
        courseId: course.id
      }
    });

    return NextResponse.json({ success: true, message: `Successfully connected ${student.name || studentEmail} to your class!` }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
  }
}
