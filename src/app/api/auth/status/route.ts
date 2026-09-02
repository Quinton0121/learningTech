import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ active: false }, { status: 401 });
    
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.sessionToken !== decoded.sessionToken) {
      return NextResponse.json({ active: false }, { status: 401 });
    }

    if (decoded.method === 'MANUAL') {
      return NextResponse.json({ active: true, slide: 0 }); // Manual logins don't get auto-logged out
    }

    // Check if the user has any active approved enrollments
    const activeEnrollment = await prisma.enrollment.findFirst({
      where: { 
        userId: decoded.userId,
        status: 'APPROVED',
        course: { isActive: true }
      }
    });

    if (activeEnrollment) {
      return NextResponse.json({ active: true, slide: activeEnrollment.currentSlide });
    } else {
      return NextResponse.json({ active: false });
    }
  } catch (error) {
    return NextResponse.json({ active: false }, { status: 401 });
  }
}
