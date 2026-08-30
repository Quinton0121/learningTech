export async function sendTelegramAdminNotification(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN || '8955744901:AAH0SLOIzTZ67UGUTzUTtKH_oWIGvMjEyX8';
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || '8141569622';

  if (!token || !chatId) return;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML'
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram admin notification:', error);
  }
}
