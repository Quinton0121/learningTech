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
  const bodyMatch = html.match(/<body[^>]*>/i);
  if (bodyMatch && bodyMatch.index !== undefined) {
    const insertIdx = bodyMatch.index + bodyMatch[0].length;
    html = html.substring(0, insertIdx) + '\n' + getSyncInjectorHTML() + '\n' + html.substring(insertIdx);
  } else {
    html = getSyncInjectorHTML() + '\n' + html;
  }

  // Inject JS at the end before </body>
  const bodyEndMatch = html.match(/<\/body>/i);
  if (bodyEndMatch && bodyEndMatch.index !== undefined) {
    const bodyEndIdx = bodyEndMatch.index;
    html = html.substring(0, bodyEndIdx) + '\n' + getSyncInjectorJS(course.id) + '\n' + html.substring(bodyEndIdx);
  } else {
    html = html + '\n' + getSyncInjectorJS(course.id);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
