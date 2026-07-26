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
    
    const { courseId, studentId, action } = await request.json(); // action = 'APPROVE' or 'REJECT'
    
    const course = await prisma.course.findFirst({ where: { id: courseId, educatorId: decoded.userId }});
    if (!course) return NextResponse.json({ error: 'Unauthorized' }, { status: 404 });

    if (action === 'REJECT') {
      await prisma.enrollment.delete({ where: { userId_courseId: { userId: studentId, courseId: course.id } }});
      return NextResponse.json({ success: true, message: 'Request rejected' }, { status: 200 });
    } else {
      await prisma.enrollment.update({
        where: { userId_courseId: { userId: studentId, courseId: course.id } },
        data: { status: 'APPROVED' }
      });
      return NextResponse.json({ success: true, message: 'Request approved' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
