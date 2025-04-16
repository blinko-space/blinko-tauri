import express from 'express';
import path from 'path';
import { FileService } from '../../lib/files';
import { getToken } from '../../lib/helper';
import cors from 'cors';

const router = express.Router();

router.options('/', cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*',
  maxAge: 86400
}));

router.post('/', async (req, res) => {
  try {
    const token = await getToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (process.env.IS_DEMO) {
      return res.status(401).json({ error: "In Demo App" });
    }

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ error: "Failed to fetch file from URL" });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const urlPath = new URL(url).pathname;
    const originalName = path.basename(urlPath).replace(/\s+/g, "_");
    const filePath = await FileService.uploadFile({
      buffer,
      originalName,
      type: response.headers.get("content-type") || "",
      accountId: Number(token.id)
    });

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    });

    return res.status(200).json({
      Message: "Success",
      status: 200,
      ...filePath,
      originalURL: url,
      type: response.headers.get("content-type") || "",
      size: buffer.length
    });
  } catch (error) {
    console.error("Error uploading file from URL:", error);
    return res.status(500).json({ error: "Failed to upload file from URL" });
  }
});

export default router;
