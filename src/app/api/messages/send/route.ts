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
    const senderId = decoded.userId;

    const { receiverId, content } = await request.json();

    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Missing receiverId or content' }, { status: 400 });
    }

    let finalReceiverId = receiverId;
    if (receiverId === 'ADMIN') {
      const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (adminUser) {
        finalReceiverId = adminUser.id;
      } else {
        return NextResponse.json({ error: 'No admin user found' }, { status: 404 });
      }
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: finalReceiverId,
        content
      }
    });

    // Enforce policy: max 30 messages per conversation to keep database small
    const conversationMessages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId: finalReceiverId },
          { senderId: finalReceiverId, receiverId: senderId }
        ]
      },
      orderBy: { createdAt: 'desc' },
      select: { id: true }
    });

    if (conversationMessages.length > 30) {
      const messagesToDelete = conversationMessages.slice(30).map(m => m.id);
      await prisma.message.deleteMany({
        where: { id: { in: messagesToDelete } }
      });
    }

    return NextResponse.json({ message: 'Message sent successfully', data: message }, { status: 200 });
  } catch (error: any) {
    console.error('Send message error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
  }
}
