import nodemailer from 'nodemailer';
import { sendSMTPMail } from '../../../lib/email';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.RECEIVER_EMAIL;

    if (!host || !user || !pass || !receiver) {
      return new Response(JSON.stringify({ error: 'SMTP not configured' }), { status: 500 });
    }

    const secure = (process.env.SMTP_SECURE || 'false') === 'true' || port === 465;

    const now = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const salonHtml = `
      <h2>Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '—'}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br/>')}</p>
      <p style="margin-top:12px;color:#6B7280;font-size:12px">Received: ${now}</p>
    `;

    // send to salon/owner
    await sendSMTPMail({
      from: user,
      to: receiver,
      subject: `Contact message from ${name}`,
      text: `Message from ${name} (${email}) - ${phone || '—'}: ${message}`,
      html: salonHtml,
    });

    // optional confirmation to user
    const userHtml = `
      <h2>We received your message</h2>
      <p>Hi ${name},</p>
      <p>Thanks for contacting Queen's Nails. We've received your message and will respond within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br/>')}</p>
      <p style="margin-top:12px;color:#6B7280;font-size:12px">Received: ${now}</p>
    `;

    await sendSMTPMail({
      from: user,
      to: email,
      subject: 'We received your message',
      text: `Thanks ${name}, we've received your message.`,
      html: userHtml,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact email error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
