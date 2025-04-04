import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(cors()); // Allow all origins

app.get("/google", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&hl=en`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    );

    res.json(response.data[1]);
  } catch {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

app.listen(3003, () => console.log("Proxy server running on port 3003"));
