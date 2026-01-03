import nodemailer from 'nodemailer';
import { bookingConfirmationEmail } from '../../../emailTemplates/bookingConfirmation';
import { sendSMTPMail } from '../../../lib/email';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, date, time, service, servicePrice, services, servicesTotal } = data;

    if (!name || !email || !phone || !date || !time) {
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

    const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const normalizedServices: Array<{ name: string; price?: string | null }> = (() => {
      if (Array.isArray(services)) {
        return services
          .map((s: any) => {
            if (typeof s === 'string') return { name: s };
            if (s && typeof s === 'object' && typeof s.name === 'string') return { name: s.name, price: s.price ?? null };
            return null;
          })
          .filter(Boolean) as Array<{ name: string; price?: string | null }>;
      }

      if (service) {
        return [{ name: String(service), price: servicePrice ?? null }];
      }

      return [];
    })();

    const serviceLine = normalizedServices.length
      ? normalizedServices.map((s) => (s.price ? `${s.name} (${s.price})` : s.name)).join(', ')
      : 'N/A';

    const totalLine = typeof servicesTotal === 'number' ? `$${servicesTotal}` : null;

    const salonHtml = `
      <h2>New Booking</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Services:</strong> ${serviceLine}</p>
      ${totalLine ? `<p><strong>Estimated total:</strong> ${totalLine}</p>` : ''}
    `;

    const userHtml = bookingConfirmationEmail({
      name,
      date: formattedDate,
      time,
      service,
      servicePrice,
      services: normalizedServices,
      servicesTotal: typeof servicesTotal === 'number' ? servicesTotal : null,
      phone,
    });

    // Send to salon/owner
    await sendSMTPMail({
      from: user,
      to: receiver,
      subject: `New booking from ${name}`,
      text: `New booking: ${name} - ${email} - ${phone} - ${formattedDate} ${time} - Services: ${serviceLine}${totalLine ? ` - Total: ${totalLine}` : ''}`,
      html: salonHtml,
    });

    // Send confirmation to customer
    await sendSMTPMail({
      from: user,
      to: email,
      subject: 'Your booking confirmation',
      text: `Hi ${name}, your booking is confirmed for ${formattedDate} at ${time}.`,
      html: userHtml,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    // Log for server-side debugging
    // eslint-disable-next-line no-console
    console.error('Booking email error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
