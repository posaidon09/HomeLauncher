import PocketBase from "pocketbase";
const pb = new PocketBase("https://posaidon.pockethost.io");
import formidable from "formidable";

// Disable Next.js body parser to allow formidable to handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const origin = req.headers.origin || "*";

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Use a POST request" });
  }

  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const id = fields.id?.[0];
    const bg = fields.image?.[0]; // This is the uploaded file (not a string)

    if (!id || !bg) {
      return res.status(400).json({ error: "Missing image or id" });
    }

    // If you're storing just the filename or path, get it from bg:
    // const bgPath = bg.filepath;

    const prev = await pb.collection("settings").getOne(id);
    const updated = await pb.collection("settings").update(id, {
      ...prev,
      background: bg, // Or bgPath, depending on what you're storing
    });

    return res.status(200).json({ message: "Successfully updated settings" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
}
