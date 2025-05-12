import translate from "translate";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { text, from, to } = req.body;
  if (!text || !from || !to)
    return res.status(400).json({ error: "Missing field" });

  try {
    const response = await translate(text, {
      from,
      to,
    });
    return res.status(200).json({ translation: response });
  } catch {
    return res.status(500).json({ error: "Failed to fetch translation" });
  }
}
