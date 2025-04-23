import axios from "axios";

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

  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(searchQuery)}&hl=en`,
    );
    return res.status(200).json(response.data[1]);
  } catch {
    return res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
