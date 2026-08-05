import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied: Requires Admin role' }, { status: 403 });
    }

    // Find all courses that are isActive = false
    const pendingCourses = await prisma.course.findMany({
      where: { isActive: false },
      include: { educator: { select: { name: true, email: true } } }
    });

    const pendingDir = path.join(process.cwd(), 'public', 'pending_courses');
    const coursesWithFiles = pendingCourses.map(course => {
      const fileExists = fs.existsSync(path.join(pendingDir, `${course.id}.txt`));
      return { ...course, hasPendingFile: fileExists };
    }).filter(c => c.hasPendingFile);
    const educators = await prisma.user.findMany({
      where: { role: { in: ['EDUCATOR', 'ADMIN'] } },
      select: { id: true, name: true, email: true, role: true }
    });

    return NextResponse.json({ pendingCourses: coursesWithFiles, educators });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


