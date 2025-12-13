import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    debugger
    const data = await req.json();
    const { name, email, phone, date, time, service } = data;

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

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const salonHtml = `
      <h2>New Booking</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Service:</strong> ${service || 'N/A'}</p>
    `;

    const userHtml = `
      <h2>Booking Confirmation</h2>
      <p>Hi ${name},</p>
      <p>Thanks for booking with us. Here are your appointment details:</p>
      <ul>
        <li><strong>Date:</strong> ${formattedDate}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Service:</strong> ${service || 'N/A'}</li>
      </ul>
      <p>We will contact you at ${phone} if we need to confirm anything.</p>
      <p>See you soon!</p>
    `;

    // Send to salon/owner
    await transporter.sendMail({
      from: user,
      to: receiver,
      subject: `New booking from ${name}`,
      text: `New booking: ${name} - ${email} - ${phone} - ${formattedDate} ${time} - Service: ${service || 'N/A'}`,
      html: salonHtml,
    });

    // Send confirmation to customer
    await transporter.sendMail({
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
