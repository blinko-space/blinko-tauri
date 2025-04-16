import express from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

const router = express.Router();

router.get('/*', (req, res) => {
  try {
    const pathArray = req.params[0].split('/').filter(Boolean);
    const filePath = join('.blinko', 'plugins', ...pathArray);
    const stream = createReadStream(filePath);
    res.set('Content-Type', 'application/javascript');
    stream.on('error', (error) => {
      console.error('Error reading plugin file:', error);
      if (!res.headersSent) {
        res.status(404).json({ error: 'Plugin not found' });
      }
    });
    stream.pipe(res);
  } catch (error) {
    console.error('Error serving plugin file:', error);
    res.status(404).json({ error: 'Plugin not found' });
  }
});

export default router;
