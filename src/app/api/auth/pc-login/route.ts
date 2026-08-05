import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pcId } = body;

    if (!pcId) {
      return NextResponse.json({ error: 'Missing pcId' }, { status: 400 });
    }

    // Find any ACTIVE course that has an enrollment mapped to this pcId
    const activeEnrollment = await prisma.enrollment.findFirst({
      where: {
        pcId: pcId,
        course: {
          isActive: true
        }
      },
      include: {
        user: true,
        course: true
      }
    });

    if (!activeEnrollment) {
      return NextResponse.json({ error: 'No active class found for this PC.' }, { status: 404 });
    }

    const crypto = require('crypto');
    const sessionToken = crypto.randomUUID();

    await prisma.user.update({
      where: { id: activeEnrollment.userId },
      data: { sessionToken }
    });

    const token = jwt.sign(
      { userId: activeEnrollment.userId, role: activeEnrollment.user.role, method: 'AUTO', sessionToken },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return NextResponse.json({ 
      success: true, 
      token,
      user: activeEnrollment.user,
      course: activeEnrollment.course
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
