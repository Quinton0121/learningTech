import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendTelegramAdminNotification } from '@/lib/telegramNotify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { email, password, name, role, authType, verificationCode, verificationToken } = body;
    if (email) email = email.toLowerCase();

    // Validate request
    if (!email || !password || !name || !verificationCode || !verificationToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the verification code using JWT
    try {
      const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET || 'super-secret-development-key-change-in-production') as any;
      if (decoded.purpose !== 'registration_verification' || decoded.email !== email || decoded.code !== verificationCode) {
        return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
      }
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
    }

    // Check existing user
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Calculate 30 day trial expiration
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 30);

    // Prevent anyone from registering as ADMIN via the API
    let assignedRole = role || 'LEARNER';
    if (assignedRole === 'ADMIN' && email !== 'quinton0121@gmail.com') {
      assignedRole = 'LEARNER'; // Force to learner if they try to hack it
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: assignedRole,
        authType: authType || 'EMAIL',
        trialExpiresAt,
      },
    });

    // Send Telegram alert to admin about new registered user
    sendTelegramAdminNotification(
      `🎉 <b>[Interlectic New User Signup!]</b>\n<b>Name:</b> ${name}\n<b>Email:</b> <code>${email}</code>\n<b>Role:</b> ${assignedRole}\n<b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Macau' })}`
    ).catch(() => {});

    // Don't send password hash back
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ 
      message: 'Registration successful', 
      user: userWithoutPassword 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
