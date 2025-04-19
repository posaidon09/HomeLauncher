import pb from "./../index.js";

export default async function handler(req, res) {
  const key = req.query.k;
  const value = req.query.v;
  const id = req.query.id;
  if (!key || !value)
    return res.status(400).json({ error: "Missing parameters" });

  try {
    if (!(await pb.collection("settings").getOne(id))) {
      const newEntry = await pb.collection("settings").create({
        style: 1,
        bg: "wind.png",
        newTab: "_self",
        sites: [],
        commands: [],
      });
      return res
        .status(200)
        .json({ message: "Successfully Created settings", id: newEntry.id });
    }
  } catch {
    return res.status(400).json({ error: "Something went wrong" });
  }
}
