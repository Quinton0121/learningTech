import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(req: Request) {
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
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 403 });
    }

    const { title, description, slidesData } = await req.json();

    const course = await prisma.course.create({
      data: {
        title: title || 'New Course',
        description: description || 'Course description',
        educatorId: user.id,
      }
    });

    // Generate HTML content based on a template
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Interactive Learning</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0f172a; color: #f8fafc; overflow: hidden; }
        .slide-container {
            position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            opacity: 0; pointer-events: none; transition: opacity 0.8s ease-in-out; padding: 2rem;
            text-align: center;
        }
        .slide-container.active { opacity: 1; pointer-events: auto; }
        .slide-nav { position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px; z-index: 50; }
        .nav-btn { background: #38bdf8; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; border: none; font-weight: 600; }
    </style>
</head>
<body>
    ${slidesData.map((slide: any, idx: number) => `
    <div class="slide-container ${idx === 0 ? 'active' : ''}" id="slide-${idx}">
        <h1 class="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">${slide.title}</h1>
        <ul class="text-xl text-gray-300 space-y-4 max-w-3xl mx-auto list-disc text-left">
            ${slide.bullets.map((bullet: string) => `<li>${bullet}</li>`).join('')}
        </ul>
    </div>
    `).join('')}

    <div class="slide-nav">
        <button class="nav-btn" onclick="prevSlide()">Prev</button>
        <button class="nav-btn" onclick="nextSlide()">Next</button>
    </div>

    <script>
        let currentSlide = 0;
        const totalSlides = ${slidesData.length};
        function showSlide(index) {
            document.querySelectorAll('.slide-container').forEach(el => el.classList.remove('active'));
            document.getElementById('slide-' + index).classList.add('active');
        }
        function nextSlide() {
            if (currentSlide < totalSlides - 1) { currentSlide++; showSlide(currentSlide); }
        }
        function prevSlide() {
            if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); }
        }
    </script>
</body>
</html>`;

    const filepath = path.join(process.cwd(), 'public', 'courses', `${course.id}.html`);
    fs.writeFileSync(filepath, htmlContent);

    return NextResponse.json({ message: 'Course created', course });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
