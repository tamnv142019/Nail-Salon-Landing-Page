export function bookingConfirmationEmail({ name, date, time, service, phone }: { name: string; date: string; time: string; service?: string | null; phone?: string }) {
  const safeService = service || 'N/A';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Booking Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#1F2937;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:30px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#ffffff;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(90deg,#89CFF0 0%,#6FBDE8 100%);padding:28px 32px;">
                <h1 style="margin:0;color:#0F172A;font-size:20px;line-height:1.1;font-weight:700">Booking Confirmed</h1>
                <p style="margin:6px 0 0;color:#0F172A;opacity:0.9">Thanks for booking with us, ${name}.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <p style="margin:0 0 12px;color:#1F2937">We've received your appointment. Below are the details:</p>
                <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:collapse;margin:12px 0 20px;">
                  <tr>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;width:35%;font-weight:600;color:#374151">Date</td>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;color:#111827">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;font-weight:600;color:#374151">Time</td>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;color:#111827">${time}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;font-weight:600;color:#374151">Service</td>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;color:#111827">${safeService}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;font-weight:600;color:#374151">Phone</td>
                    <td style="padding:8px 0;border-top:1px solid #F1F5F9;color:#111827">${phone || '—'}</td>
                  </tr>
                </table>

                <p style="margin:0 0 18px;color:#6B7280">If you need to change or cancel your appointment, please reply to this email or call us.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#F9FAFB;padding:16px 32px;color:#6B7280;font-size:13px;text-align:center;">
                <div>Queens Nails Hair & Skin care — Thank you</div>
                <div style="margin-top:6px;color:#9CA3AF;font-size:12px">If this wasn't you, please contact us immediately. Call (619) 224-5050 </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
