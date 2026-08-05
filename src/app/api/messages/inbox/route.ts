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
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    let whereClause: any = {
      OR: [
        { receiverId: userId },
        { senderId: userId }
      ]
    };

    if (user?.role === 'ADMIN') {
      const allAdmins = await prisma.user.findMany({ where: { role: 'ADMIN' }, select: { id: true } });
      const adminIds = allAdmins.map(a => a.id);
      whereClause = {
        OR: [
          { receiverId: { in: adminIds } },
          { senderId: { in: adminIds } }
        ]
      };
    }

    const messages = await prisma.message.findMany({
      where: whereClause,
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
        receiver: { select: { id: true, name: true, email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch messages error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch messages' }, { status: 500 });
  }
}
