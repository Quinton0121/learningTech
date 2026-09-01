import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.sessionToken !== decoded.sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, score, range1, range2, formula } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
    }

    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: courseId,
        status: 'APPROVED'
      }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Active enrollment not found for this course' }, { status: 404 });
    }

    const gameDetails = JSON.stringify({
      score: typeof score === 'number' ? score : 0,
      range1: range1 || '',
      range2: range2 || '',
      formula: formula || '',
      submittedAt: new Date().toISOString()
    });

    const updated = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        gameScore: typeof score === 'number' ? score : 0,
        gameDetails: gameDetails,
        lastSeenAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      score: updated.gameScore,
      gameDetails: updated.gameDetails
    }, { status: 200 });

  } catch (error) {
    console.error('Error submitting score:', error);
    return NextResponse.json({ error: 'Failed to record score' }, { status: 500 });
  }
}
