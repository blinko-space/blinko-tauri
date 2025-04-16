import express from 'express';
import { FileService } from '../../lib/files';
import { getToken } from '../../lib/helper';
import { Readable, PassThrough } from 'stream';
import busboy from 'busboy';
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

    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: "Content type must be multipart/form-data" });
    }
    
    const bb = busboy({ headers: req.headers });
    
    let fileInfo: { 
      stream: PassThrough | null,
      filename: string,
      mimeType: string,
      size: number
    } | null = null;
    
    bb.on('file', (fieldname, stream, info) => {
      if (fieldname === 'file') {
        const passThrough = new PassThrough();
        let fileSize = 0;
        const decodedFilename = Buffer.from(info.filename, 'binary').toString('utf-8');
        
        stream.on('data', (chunk) => {
          fileSize += chunk.length;
          passThrough.write(chunk);
        });
        
        stream.on('end', () => {
          passThrough.end();
          fileInfo = {
            stream: passThrough,
            filename: decodedFilename.replace(/\s+/g, "_"),
            mimeType: info.mimeType,
            size: fileSize
          };
        });
      }
    });
    
    bb.on('finish', async () => {
      if (!fileInfo || !fileInfo.stream) {
        return res.status(400).json({ error: "No files received." });
      }
      
      try {
        const webReadableStream = Readable.toWeb(fileInfo.stream) as unknown as ReadableStream;
        
        const filePath = await FileService.uploadFileStream({
          stream: webReadableStream,
          originalName: fileInfo.filename,
          fileSize: fileInfo.size,
          type: fileInfo.mimeType,
          accountId: Number(token.id)
        });
        
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*'
        });
        
        res.status(200).json({
          Message: "Success",
          status: 200,
          ...filePath,
          type: fileInfo.mimeType,
          size: fileInfo.size
        });
      } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: "Upload failed" });
      }
    });
    
    req.pipe(bb);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
