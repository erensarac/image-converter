import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
        return res.status(400).send('Please provide an URL as a query parameter to convert base64 format.')
    }

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type");
        
        if (contentType !== 'image/jpeg' && contentType !== 'image/png') {
            return res.status(400).send('Please provide a URL that points to a JPEG/PNG image.')
        }
        
        return res.status(200).send(Buffer.from(await (response).arrayBuffer()).toString('base64'))
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
