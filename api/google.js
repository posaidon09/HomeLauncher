import axios from "axios";

export default async function handler(req, res) {
  const searchQuery = req.query.q;
  if (!searchQuery) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(searchQuery)}&hl=en`,
    );
    return res.status(200).json(response.data[1]);
  } catch {
    return res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
