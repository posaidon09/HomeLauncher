import translate from "translate";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
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
