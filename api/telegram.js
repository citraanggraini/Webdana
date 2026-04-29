export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = process.env.BOT_TOKEN;
  const chat_id = process.env.CHAT_ID;
  const { nomor, pesan } = req.body;

  const text = `NOTIF WEBSITE\n\nNomor: ${nomor || "-"}\nPesan: ${pesan || "-"}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id,
      text
    })
  });

  return res.status(200).json({ status: "ok" });
}
