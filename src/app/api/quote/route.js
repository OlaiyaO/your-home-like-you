import { NextResponse } from 'next/server';

const required = ['name', 'phone', 'service', 'message'];

export async function POST(request) {
  const body = await request.json();
  const missing = required.filter((field) => !body[field]?.trim());

  if (missing.length) {
    return NextResponse.json(
      { error: 'Missing required fields', fields: missing },
      { status: 400 },
    );
  }

  const primaryRecipient = process.env.CONTACT_PRIMARY_EMAIL;
  const secondaryRecipient = process.env.CONTACT_SECONDARY_EMAIL;
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

  if (!primaryRecipient || !apiKey) {
    return NextResponse.json({ accepted: false, mode: 'configuration-pending' }, { status: 503 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'Your Home Like You <onboarding@resend.dev>',
      to: [primaryRecipient, secondaryRecipient].filter(Boolean),
      reply_to: body.email || undefined,
      subject: `Property brief from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Phone: ${body.phone}`,
        `Email: ${body.email || 'Not provided'}`,
        `Service: ${body.service}`,
        `Location: ${body.location || 'Not provided'}`,
        '',
        body.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ accepted: true });
}
