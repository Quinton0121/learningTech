import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { courseId, action } = body; // action can be 'START' or 'STOP'

    if (!courseId || !action) {
      return NextResponse.json({ error: 'Missing courseId or action' }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    if (action === 'START') {
      // 1. Only one class can be active at a time: Stop & desync all other active courses
      await prisma.course.updateMany({
        where: {
          id: { not: courseId },
          isActive: true
        },
        data: {
          isActive: false,
          isSynced: false
        }
      });

      // 2. Start this course: default to desync (Independent mode)
      await prisma.course.update({
        where: { id: courseId },
        data: {
          isActive: true,
          isSynced: false
        }
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Class Started (Independent Mode)! Students can auto-login and navigate pages.' 
      });
    } else {
      // STOP action: Automatically desync all students and mark course inactive
      await prisma.course.update({
        where: { id: courseId },
        data: {
          isActive: false,
          isSynced: false
        }
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Class Stopped. All students have been desynced.' 
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
