import express from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

const router = express.Router();

/**
 * @swagger
 * /api/plugins/{path}:
 *   get:
 *     tags: 
 *       - Plugin
 *     summary: Get Plugin File
 *     operationId: getPluginFile
 *     parameters:
 *       - in: path
 *         name: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Path to the plugin file
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/javascript:
 *             schema:
 *               type: string
 *       404:
 *         description: Plugin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//@ts-ignore
router.get(/(.*)/, (req, res) => {
  try {
    const pathArray = req.params[0].split('/').filter(Boolean);
    const filePath = join('.blinko', 'plugins', ...pathArray);
    console.log('filePath', filePath);
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
