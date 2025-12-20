import nodemailer from 'nodemailer';

type MailOptions = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendSMTPMail({ from, to, subject, text, html }: MailOptions) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP not configured');
  }

  const secure = (process.env.SMTP_SECURE || 'false') === 'true' || port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const mail = {
    from: from || user,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mail as any);
}
