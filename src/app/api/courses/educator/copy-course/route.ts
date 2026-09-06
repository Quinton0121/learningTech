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
        sharedQuotaGroupId: rootQuotaId,
        htmlContent: originalCourse.htmlContent
      }
    });

    // Query all original enrollments with their users
    const originalEnrollments = await prisma.enrollment.findMany({
      where: { courseId: originalCourse.id },
      include: { user: true }
    });

    for (const enroll of originalEnrollments) {
      const origUser = enroll.user;
      if (!origUser) continue;

      // Create a cloned independent user for the new course
      const shortId = newCourse.id.slice(-6);
      let clonedEmail = origUser.email;
      if (clonedEmail) {
        const [local, domain] = clonedEmail.includes('@') ? clonedEmail.split('@') : [clonedEmail, 'learningtech.local'];
        clonedEmail = `${local}_${shortId}@${domain}`;
      } else {
        clonedEmail = `student_${origUser.studentId || enroll.pcId || Date.now()}_${shortId}@learningtech.local`;
      }

      const clonedUser = await prisma.user.create({
        data: {
          name: origUser.name,
          studentId: origUser.studentId,
          email: clonedEmail,
          passwordHash: origUser.passwordHash,
          role: 'LEARNER',
          authType: origUser.authType || 'EMAIL',
          mustChangePassword: origUser.mustChangePassword,
          trialExpiresAt: origUser.trialExpiresAt
        }
      });

      await prisma.enrollment.create({
        data: {
          userId: clonedUser.id,
          courseId: newCourse.id,
          pcId: enroll.pcId,
          status: 'APPROVED'
        }
      });
    }

    return NextResponse.json({ success: true, course: newCourse }, { status: 200 });

  } catch (error) {
    console.error('Copy course error:', error);
    return NextResponse.json({ error: 'Failed to copy course' }, { status: 500 });
  }
}
