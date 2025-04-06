import express from "express";
import axios from "axios";
import cors from "cors";
import Josh from "@joshdb/core";
import provider from "@joshdb/json";

const db = new Josh({
  name: "launcher",
  provider,
});

db.set("test", "test");

const app = express();
app.use(cors());

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

    res.status(200).json(response.data[1]);
  } catch {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

app.get("/test", async (req, res) => {
  const testing = await db.get("test");
  res.status(200).json(testing);
});

app.listen(3003, () => console.log("Proxy server running on port 3003"));
