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
    
    // Verify course belongs to this educator and is not archived
    const course = await prisma.course.findFirst({ where: { id: courseId, educatorId: decoded.userId }});
    if (!course || course.isArchived) {
       return NextResponse.json({ error: 'Course not found, unauthorized, or archived' }, { status: 404 });
    }

    // Enroll student if not already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: student.id, courseId: course.id } }
    });

    if (existing) {
      return NextResponse.json({ error: 'Student is already enrolled.' }, { status: 400 });
    }

    // Check quota logic
    const quotaSourceCourseId = course.sharedQuotaGroupId || course.id;
    const quotaCourse = quotaSourceCourseId === course.id ? course : await prisma.course.findUnique({ where: { id: quotaSourceCourseId }});
    
    if (!quotaCourse) {
       return NextResponse.json({ error: 'Shared quota pool not found' }, { status: 404 });
    }

    if (quotaCourse.studentQuota < 1) {
      return NextResponse.json({ error: `You have 0 seats left for this course. Please purchase more quotas. Seats cannot be reused once spent.` }, { status: 400 });
    }

      // Deduct quota, enroll student, and set startedAt if not set
      const updateData: any = { studentQuota: quotaCourse.studentQuota - 1 };
      if (!course.startedAt) {
        updateData.startedAt = new Date();
      }

      await prisma.$transaction([
        prisma.course.update({
          where: { id: quotaSourceCourseId },
          data: updateData
        }),
        ...(!course.startedAt && quotaSourceCourseId !== course.id ? [
          prisma.course.update({
            where: { id: course.id },
            data: { startedAt: new Date() }
          })
        ] : []),
        prisma.enrollment.upsert({
          where: { userId_courseId: { userId: student.id, courseId: course.id } },
          update: { status: 'APPROVED' },
          create: { userId: student.id, courseId: course.id, status: 'APPROVED' }
        })
      ]);

    return NextResponse.json({ success: true, message: `Successfully connected ${student.name || studentEmail} to your class!` }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
  }
}
