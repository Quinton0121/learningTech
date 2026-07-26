import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role, authType } = body;

    // Validate request
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    // Check existing user
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Calculate 30 day trial expiration
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 30);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: role || 'LEARNER',
        authType: authType || 'EMAIL',
        trialExpiresAt,
      },
    });

    // Don't send password hash back
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ 
      message: 'Registration successful', 
      user: userWithoutPassword 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
