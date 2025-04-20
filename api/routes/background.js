import PocketBase from "pocketbase";
const pb = new PocketBase("https://posaidon.pockethost.io");
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data"; // Node.js form-data

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

  const form = new formidable.IncomingForm({ keepExtensions: true });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const id = fields.id?.[0];
    const image = files.image?.[0];

    if (!id || !image) {
      return res.status(400).json({ error: "Missing image or id" });
    }

    // Prepare FormData for PocketBase
    const formData = new FormData();
    formData.append("background", fs.createReadStream(image.filepath));

    await pb.collection("settings").update(id, formData);

    return res.status(200).json({ message: "Successfully updated settings" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
}
