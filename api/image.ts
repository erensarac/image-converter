import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { base64 } = req.query;

  if (!base64 || typeof base64 !== "string") {
    return res
      .status(400)
      .send("Please provide an Base64 to convert image format");
  }

  try {
    if (base64.startsWith("data:image/")) {
      base64.replace(/^data:image\/(jpeg|png);base64,/, "");
    }

    const buffer = Buffer.from(base64, "base64");

    if (buffer.length === 0) {
      return res.status(400).send("Invalid Base64 string");
    }

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", buffer.length);

    return res.status(200).send(buffer);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
