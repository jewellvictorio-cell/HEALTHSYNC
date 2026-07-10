// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQuoteEmailTemplate, generateProductInquiryTemplate, generateOfferEmailTemplate } from './emailTemplate';

export async function POST(request: Request) {
  const { full_name, email, phone, department, message } = await request.json();

  // Validate required fields
  if (!full_name || !email || !phone || !department || !message) {
    return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
  }

  // Create transporter using Gmail credentials from environment variables
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  let subject = `New Inquiry – ${department}`;
  let html = '';
  if (department === 'quotation') {
    subject = `New Quote Request`;
    html = generateQuoteEmailTemplate({ full_name, email, phone, department, message });
  } else if (department === 'sales') {
    subject = `New Product Inquiry`;
    html = generateProductInquiryTemplate({ full_name, email, phone, product: 'Products Inquiry', message });
  } else if (department === 'offers') {
    subject = `New Offer Submission`;
    html = generateOfferEmailTemplate({ full_name, email, phone, offer_details: 'See Message', message });
  } else {
    html = generateQuoteEmailTemplate({ full_name, email, phone, department, message });
  }

  const mailOptions = {
    from: `"HealthSync Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject,
    replyTo: email,
    text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nDepartment: ${department}\n\nMessage:\n${message}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email.' }, { status: 500 });
  }
}
