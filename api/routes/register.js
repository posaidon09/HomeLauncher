import PocketBase from "pocketbase";
const pb = new PocketBase("https://posaidon.pockethost.io");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "not allowed" });
    const r = await fetch("https://home-launcher.vercel.app/sites.json");
    const sites = await r.json();
    const newEntry = await pb.collection("settings").create({
      style: 1,
      bg: "store.png",
      newTab: "_self",
      columns: sites.columns,
      terminal: sites.terminal,
    });
    return res
      .status(200)
      .json({ message: "Successfully Created settings", id: newEntry.id });
  } catch {
    return res.status(400).json({ error: "Something went wrong" });
  }
}
