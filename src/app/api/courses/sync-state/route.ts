import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId }});
    if (!user || user.sessionToken !== decoded.sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const clientSlideStr = searchParams.get('slide');
    const clientSlide = clientSlideStr ? parseInt(clientSlideStr, 10) : null;
    const courseId = searchParams.get('courseId');

    let course;
    if (user.role === 'EDUCATOR' || user.role === 'ADMIN') {
      if (courseId) {
        course = await prisma.course.findFirst({ where: { educatorId: user.id, id: courseId } });
      } else {
        course = await prisma.course.findFirst({ where: { educatorId: user.id } });
      }
    } else {
      let enrollment;
      if (courseId) {
        enrollment = await prisma.enrollment.findFirst({ where: { userId: user.id, status: 'APPROVED', courseId: courseId }, include: { course: true } });
      } else {
        enrollment = await prisma.enrollment.findFirst({ where: { userId: user.id, status: 'APPROVED' }, include: { course: true } });
      }

      if (enrollment) {
        course = enrollment.course;
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { 
            lastSeenAt: new Date(), 
            currentSlide: clientSlide !== null ? clientSlide : enrollment.currentSlide 
          }
        });
      }
    }
    
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

    let activeStudents = 0;
    let activeStudentDetails: { name: string, slide: number }[] = [];
    
    if (user.role === 'EDUCATOR' || user.role === 'ADMIN') {
      const activeThreshold = new Date(Date.now() - 20000);
      const activeEnrollments = await prisma.enrollment.findMany({
        where: {
          courseId: course.id,
          status: 'APPROVED',
          lastSeenAt: { gte: activeThreshold }
        },
        include: { user: { select: { name: true } } }
      });
      activeStudents = activeEnrollments.length;
      activeStudentDetails = activeEnrollments.map(e => ({
        name: e.user?.name || 'Unknown',
        slide: e.currentSlide || 0
      }));
    }
    
    return NextResponse.json({ 
      isSynced: course.isSynced, 
      currentSlide: course.currentSlide,
      publishedSlide: course.publishedSlide,
      activeStudents: activeStudents,
      activeStudentDetails,
      role: user.role
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    const { isSynced, currentSlide, publishedSlide, courseId } = await request.json();
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId }});
    if (!user || user.sessionToken !== decoded.sessionToken || (user.role !== 'EDUCATOR' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let course;
    if (courseId) {
      course = await prisma.course.findFirst({ where: { educatorId: user.id, id: courseId } });
    } else {
      course = await prisma.course.findFirst({ where: { educatorId: user.id } });
    }
    
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

    const dataToUpdate: any = {};
    if (isSynced !== undefined) dataToUpdate.isSynced = isSynced;
    if (currentSlide !== undefined) dataToUpdate.currentSlide = currentSlide;
    if (publishedSlide !== undefined) dataToUpdate.publishedSlide = publishedSlide;

    await prisma.course.update({
      where: { id: course.id },
      data: dataToUpdate
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
