// app/api/contact/route.ts
// Contact Form API with Email Notifications

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 3) {
    return false; // Max 3 requests per minute
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save to database
    const message = await prisma.message.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || 'Contact Form Submission',
        message: validatedData.message,
        ipAddress: ip,
        userAgent: userAgent,
        status: 'UNREAD',
      },
    });

    // Send email notification
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'contact@umarzeb.com',
        to: process.env.EMAIL_TO || 'contact@umarzeb.com',
        subject: `New Contact: ${validatedData.subject || 'Portfolio Contact Form'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">New Contact Form Submission</h2>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Subject:</strong> ${validatedData.subject || 'N/A'}</p>
            </div>

            <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${validatedData.message}</p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; font-size: 12px; color: #6b7280;">
              <p><strong>IP Address:</strong> ${ip}</p>
              <p><strong>User Agent:</strong> ${userAgent}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Message ID:</strong> ${message.id}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
              <p>This email was sent from your portfolio contact form at umarzeb.com</p>
              <p>View in admin panel: <a href="https://umarzeb.com/dashboard/messages">Dashboard</a></p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    // Track event (analytics)
    await prisma.event.create({
      data: {
        name: 'contact_form_submit',
        category: 'engagement',
        path: '/contact',
        metadata: {
          hasSubject: !!validatedData.subject,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET - Admin only: Fetch all messages
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const session = await getServerSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to last 100 messages
    });

    return NextResponse.json({ messages });

  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
