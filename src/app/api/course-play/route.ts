import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSyncInjectorHTML, getSyncInjectorJS } from '@/lib/syncInjector';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response('Course ID required', { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) {
    return new Response('Course not found', { status: 404 });
  }

  if (!course.htmlContent) {
    // Fallback for older courses that don't have HTML content in the database yet
    return NextResponse.redirect(new URL(`/course.html?id=${id}`, req.url));
  }

  let html = course.htmlContent;
  
  // Inject UI at the start of <body>
  const bodyStartIdx = html.indexOf('<body>');
  if (bodyStartIdx !== -1) {
    const insertIdx = bodyStartIdx + 6;
    html = html.substring(0, insertIdx) + '\n' + getSyncInjectorHTML() + '\n' + html.substring(insertIdx);
  }

  // Inject JS at the end before </body>
  const bodyEndIdx = html.lastIndexOf('</body>');
  if (bodyEndIdx !== -1) {
    html = html.substring(0, bodyEndIdx) + '\n' + getSyncInjectorJS() + '\n' + html.substring(bodyEndIdx);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
