# Booking notifications

Booking emails use the server's SMTP settings and `RECEIVER_EMAIL`.
Set `RECEIVER_EMAIL=queennailhairandskincare@gmail.com` on the deployment.

Telegram notifications are optional. Create a bot with Telegram's @BotFather,
open your bot, press Start, and send it a message. Use the Bot API's getUpdates
method to find `message.chat.id` for the chat receiving notifications.

Set these server-only environment variables and redeploy:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Keep the token secret. Do not commit it or prefix these variables with
NEXT_PUBLIC_. Revoke any exposed token through @BotFather before deployment.

After the salon booking email is sent, the API attempts a Telegram notification
with the customer name, appointment date and time, services, and phone number.
Telegram failures are logged without failing the booking submission.
If both Telegram variables are absent, no Telegram request is made.

Deploy and submit a test booking to confirm delivery to your chat.
