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

    await prisma.course.update({
      where: { id: courseId },
      data: {
        isActive: action === 'START',
        ...(action === 'START' ? { isSynced: true } : {})
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: action === 'START' ? 'Class Started! Students will auto-login and jump to slides.' : 'Class Stopped.' 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
