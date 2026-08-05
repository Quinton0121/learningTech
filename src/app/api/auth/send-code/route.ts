import { NextResponse } from 'next/server';
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

    // Generate a 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a temporary JWT holding this code for this email (valid for 10 mins)
    const verificationToken = jwt.sign(
      { email, code, purpose: 'registration_verification' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    if (process.env.RESEND_API_KEY) {
      try {
        const { error } = await resend.emails.send({
          from: 'Interlectic <onboarding@resend.dev>',
          to: email,
          subject: 'Your Registration Verification Code - Interlectic',
          html: `
            <h3>Welcome to Interlectic!</h3>
            <p>Your registration verification code is: <strong style="font-size: 24px; letter-spacing: 2px;">${code}</strong></p>
            <p>Please enter this code on the registration page to complete your signup.</p>
            <p>This code will expire in 10 minutes.</p>
          `,
        });
        if (error) {
          throw new Error(error.message);
        }
      } catch (err: any) {
        console.error('Resend Error:', err.message);
        console.log(`\n=========================================`);
        console.log(`[DEV FALLBACK] Email failed to send.`);
        console.log(`Verification code for ${email} is: ${code}`);
        console.log(`=========================================\n`);
      }
    }

    return NextResponse.json({ 
      message: 'Verification code sent',
      verificationToken
    }, { status: 200 });

  } catch (error: any) {
    console.error('Send code error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
