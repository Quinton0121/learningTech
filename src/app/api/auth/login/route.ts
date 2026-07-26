import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phoneNumber, password } = body;

    if (!email && !phoneNumber) {
      return NextResponse.json({ error: 'Email or phone number is required' }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Find the user by either email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phoneNumber: phoneNumber || undefined }
        ]
      }
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if trial is expired
    const isTrialExpired = new Date() > user.trialExpiresAt;

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        isTrialExpired 
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Don't send password hash back
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ 
      message: 'Login successful', 
      token,
      user: userWithoutPassword,
      isTrialExpired
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
