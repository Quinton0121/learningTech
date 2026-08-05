import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-development-key-change-in-production';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    email = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' }, { status: 200 });
    }

    const resetToken = jwt.sign(
      { userId: user.id, purpose: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${appUrl}/reset-password?token=${resetToken}`;
    
    console.log(`Sending reset link for ${email}: ${resetLink}`);

    if (process.env.RESEND_API_KEY) {
      try {
        const { error } = await resend.emails.send({
          from: 'Interlectic <onboarding@resend.dev>',
          to: email,
          subject: 'Reset Your Password - Interlectic',
          html: `
            <h3>Password Reset Request</h3>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
            <br/>
            <p>Thank you,<br/>The Interlectic Team</p>
          `,
        });
        if (error) {
          throw new Error(error.message);
        }
      } catch (err: any) {
        console.error('Resend forgot-password error:', err.message);
      }
    }

    return NextResponse.json({ 
      message: 'If the email exists, a reset link has been sent.' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
