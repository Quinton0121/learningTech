import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let courses = await prisma.course.findMany();
    
    // Seed default course if empty
    if (courses.length === 0) {
      let educator = await prisma.user.findFirst({ where: { role: 'EDUCATOR' } });
      if (!educator) {
         educator = await prisma.user.create({
           data: {
             email: 'admin@edusphere.com',
             name: 'Admin Educator',
             role: 'EDUCATOR',
             trialExpiresAt: new Date(Date.now() + 100000000000),
           }
         });
      }
      
      const newCourse = await prisma.course.create({
        data: {
          title: 'Mastering Excel for Business',
          description: 'Advanced spreadsheet techniques, macros, and financial modeling designed specifically for corporate professionals.',
          educatorId: educator.id
        }
      });
      courses = [newCourse];
    }
    
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
