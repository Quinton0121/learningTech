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
    
    // Fetch courses taught by this educator
    let courses = await prisma.course.findMany({ 
      where: { educatorId: decoded.userId },
      include: { 
        enrollments: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        } 
      }
    });
    
    // Seed default course if they have none
    if (courses.length === 0) {
      const newCourse = await prisma.course.create({
        data: {
          title: 'Mastering Excel for Business',
          description: 'Advanced spreadsheet techniques, macros, and financial modeling designed specifically for corporate professionals.',
          educatorId: decoded.userId
        },
        include: { 
          enrollments: {
            include: {
              user: { select: { id: true, name: true, email: true } }
            }
          } 
        }
      });
      courses = [newCourse];
    }
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    // Resolve shared quotas and check expiration
    const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000; // Approx 13 months
    const now = Date.now();

    for (let course of courses) {
      // Auto-archive logic based on startedAt
      if (!course.isArchived && course.startedAt && (now - new Date(course.startedAt).getTime() > THIRTEEN_MONTHS_MS)) {
        await prisma.course.update({
          where: { id: course.id },
          data: { isArchived: true, isActive: false }
        });
        course.isArchived = true;
        course.isActive = false;
      }

      if (course.sharedQuotaGroupId && course.sharedQuotaGroupId !== course.id) {
        const rootCourse = await prisma.course.findUnique({ where: { id: course.sharedQuotaGroupId } });
        if (rootCourse) {
          course.studentQuota = rootCourse.studentQuota;
          (course as any).sharedQuotaCourseName = rootCourse.title;
        }
      }
    }

    return NextResponse.json({ courses, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
