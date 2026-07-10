// src/app/api/careers/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateCareerEmailTemplate } from '../contact/emailTemplate';

export async function POST(request: Request) {
  const {
    full_name,
    email,
    phone,
    department,
    position,
    message,
    resumeBase64,
  } = await request.json();

  // Basic validation
  if (!full_name || !email || !phone || !department || !position) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions: any = {
    from: `"HealthSync Careers" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Career Application – ${position}`,
    replyTo: email,
    text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nDepartment: ${department}\nPosition: ${position}\n\nMessage:\n${message || ''}`,
    html: generateCareerEmailTemplate({
      full_name,
      email,
      phone,
      department,
      position,
      message: message || '',
    }),
  };

  // Attach resume if provided
  if (resumeBase64) {
    mailOptions.attachments = [
      {
        filename: 'resume.pdf',
        content: resumeBase64,
        encoding: 'base64',
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Application sent successfully.' });
  } catch (error) {
    console.error('Nodemailer error (careers):', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send application.' },
      { status: 500 }
    );
  }
}
