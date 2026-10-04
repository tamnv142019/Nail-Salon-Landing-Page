export async function sendBookingTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token && !chatId) return;
  if (!token || !chatId) throw new Error('Telegram booking configuration is incomplete');

  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // Fetch errors can include the URL containing the secret token.
    throw new Error('Telegram booking notification connection failed');
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) {
    throw new Error(`Telegram booking notification failed (HTTP ${response.status})`);
  }
}
