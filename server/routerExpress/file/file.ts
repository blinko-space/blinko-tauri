import express from 'express';
import path from 'path';
import { createReadStream, statSync } from 'fs';
import { stat, readFile, mkdir } from 'fs/promises';
import fs from 'fs';
import mime from 'mime-types';
import { UPLOAD_FILE_PATH } from '../../../shared/lib/constant';
import crypto from 'crypto';
import sharp from 'sharp';
import { prisma } from '../../prisma';
import { getToken } from '../../lib/helper';

const router = express.Router();
const STREAM_THRESHOLD = 5 * 1024 * 1024;
const IMAGE_PROCESSING_TIMEOUT = 30000;

let activeStreams = 0;


router.get(/.*/, async (req, res) => {
  const fullPath = decodeURIComponent(req.path.substring(1));
  const token = await getToken(req);

  const needThumbnail = req.query.thumbnail === 'true';
  const isDownload = req.query.download === 'true';

  if (!fullPath.includes('temp/') && !fullPath.endsWith('.bko')) {
    try {
      const myFile = await prisma.attachments.findFirst({
        where: {
          path: '/api/file/' + fullPath
        },
        include: {
          note: {
            select: {
              isShare: true,
              accountId: true
            }
          }
        }
      });

      if (myFile && !myFile?.note?.isShare && Number(token?.id) != myFile?.note?.accountId && !myFile?.accountId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error('Error checking file permissions:', error);
      return res.status(500).json({ error: "Error checking file permissions" });
    }
  }

  if (fullPath.endsWith('.bko') && token?.role !== 'superadmin') {
    return res.status(401).json({ error: "Only superadmin can access" });
  }

  const sanitizedPath = fullPath.replace(/^[./\\]+/, '');
  const filePath = path.join(UPLOAD_FILE_PATH, sanitizedPath);

  try {
    try {
      await stat(filePath);
    } catch (error) {
      console.error(`File not found: ${filePath}`, error);
      return res.status(404).json({ message: "File not found" });
    }

    if (isImage(fullPath) && needThumbnail) {
      let processingTimeout = setTimeout(() => {
        return res.status(408).json({ message: "Image processing timeout" });
      }, IMAGE_PROCESSING_TIMEOUT);
      
      try {
        const thumbnailStream = sharp()
          .rotate()
          .resize(500, 500, {
            fit: 'inside',
            withoutEnlargement: true
          });
        
        createReadStream(filePath).pipe(thumbnailStream);
        
        const thumbnail = await thumbnailStream.toBuffer();

        const filename = path.basename(fullPath);
        const safeFilename = Buffer.from(filename).toString('base64');

        clearTimeout(processingTimeout);
        res.set({
          "Content-Type": mime.lookup(filePath) || "image/jpeg",
          "Cache-Control": "public, max-age=31536000",
          "Content-Disposition": `inline; filename="${safeFilename}"`
        });
        return res.send(thumbnail);
      } catch(error) {
        clearTimeout(processingTimeout);
        console.error('Error processing thumbnail:', error);
        return res.status(500).json({ message: "Error processing thumbnail" });
      }
    }

    const stats = await stat(filePath);

    if (!stats.isFile()) {
      return res.status(404).json({ message: "Not a valid file" });
    }

    const fileHash = generateFileHash(filePath);
    const etag = `"${fileHash}"`;
    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === etag) {
      return res.status(304).end();
    }

    const contentType = mime.lookup(filePath) || "application/octet-stream";
    const encodedFilename = encodeURIComponent(fullPath).replace(/['()]/g, (char) => '%' + char.charCodeAt(0).toString(16));
    const fallbackFilename = `file${path.extname(fullPath)}`;
    
    res.set({
      "Content-Type": contentType,
      "ETag": etag,
      "Cache-Control": "public, max-age=3600"
    });

    if (isDownload) {
      res.set("Content-Disposition", `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`);
    }

    const range = req.headers.range;

    if (stats.size > STREAM_THRESHOLD) {
      activeStreams++;
      console.log(`[File Stream] Active streams: ${activeStreams}, Path: ${fullPath}`);
      
      req.on('close', () => {
        activeStreams--;
        console.log(`[File Stream] Connection closed. Active streams: ${activeStreams}`);
      });

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0]!, 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = (end - start) + 1;

        res.set({
          "Content-Length": chunksize.toString(),
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Accept-Ranges": "bytes"
        });
        res.status(206);

        const stream = createReadStream(filePath, { start, end });
        
        const timeout = setTimeout(() => {
          console.log(`[File Stream] Timeout for ${fullPath}`);
          stream.destroy();
          res.end();
          activeStreams--;
        }, 300000);
        
        stream.on('end', () => {
          clearTimeout(timeout);
          activeStreams--;
        });
        
        stream.on('error', (error) => {
          clearTimeout(timeout);
          console.error(`[File Stream] Stream error: ${error.message}`);
          if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.end();
          }
          activeStreams--;
        });
        
        stream.pipe(res);
      } else {
        res.set({
          "Content-Length": stats.size.toString(),
          "Accept-Ranges": "bytes"
        });

        const stream = createReadStream(filePath);
        
        const timeout = setTimeout(() => {
          console.log(`[File Stream] Timeout for ${fullPath}`);
          stream.destroy();
          res.end();
          activeStreams--;
        }, 300000);
        
        stream.on('end', () => {
          clearTimeout(timeout);
          activeStreams--;
        });
        
        stream.on('error', (error) => {
          clearTimeout(timeout);
          console.error(`[File Stream] Stream error: ${error.message}`);
          if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.end();
          }
          activeStreams--;
        });
        
        stream.pipe(res);
      }
    } else {
      try {
        const fileContent = await readFile(filePath);
        res.set({
          "Content-Length": stats.size.toString(),
          "Accept-Ranges": "bytes"
        });
        return res.send(fileContent);
      } catch (error) {
        console.error(`Error reading file: ${filePath}`, error);
        return res.status(500).json({ message: "Error reading file" });
      }
    }
  } catch (error: any) {
    console.error('Error serving file:', error);
    if (error.code === 'ENOENT') {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

function generateFileHash(filePath: string): string {
  try {
    const stats = statSync(filePath);
    const hashContent = `${stats.mtime.getTime()}-${stats.size}`;
    const hashSum = crypto.createHash('sha256');
    hashSum.update(hashContent);
    return hashSum.digest('hex');
  } catch (error) {
    console.error(`Error generating file hash for ${filePath}:`, error);
    return crypto.randomBytes(16).toString('hex');
  }
}

function isImage(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

export default router; 