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

    await prisma.course.update({
      where: { id: courseId },
      data: { isActive: action === 'START' }
    });

    return NextResponse.json({ success: true, message: action === 'START' ? 'Class Started! Students can auto-login.' : 'Class Stopped.' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
