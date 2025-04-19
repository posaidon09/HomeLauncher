import PocketBase from "pocketbase";
const pb = new PocketBase("https://posaidon.pockethost.io");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const id = req.query.id;
  // POST METHOD
  if (req.method == "POST") {
    const key = req.query.k;
    const value = req.query.v;
    if (!key || !value)
      return res.status(400).json({ error: "Missing parameters" });

    try {
      if (await pb.collection("settings").getOne(id)) {
        const prev = await pb.collection("settings").getOne(id);
        const updated = await pb.collection("settings").update(id, {
          ...prev,
          [key]: value,
        });
        return res
          .status(200)
          .json({ message: "Successfully Updated settings", id: updated });
      } else return res.status(404).json({ message: "ID not found" });
    } catch {
      return res.status(400).json({ error: "Something went wrong" });
    }
    // GET METHOD
  } else if (req.method == "GET") {
    try {
      const data = await pb.collection("settings").getOne(id);
      return res.status(200).json({ settings: data });
    } catch {
      return res
        .status(400)
        .json({ message: "Something went wrong. check your request" });
    }
  }
}
