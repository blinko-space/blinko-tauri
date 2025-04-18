import express from 'express';
import { FileService } from '../../lib/files';
import { getTokenFromRequest } from '../../lib/helper';

const router = express.Router();

/**
 * @swagger
 * /api/file/delete:
 *   post:
 *     tags: 
 *       - File
 *     summary: Delete File
 *     operationId: deleteFile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attachment_path:
 *                 type: string
 *                 description: File path (example - /api/file/123.png)
 *             required:
 *               - attachment_path
 *     responses:
 *       200:
 *         description: Delete Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                 status:
 *                   type: number
 *     security:
 *       - bearer: []
 */
router.post('/', async (req, res) => {
  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { attachment_path } = req.body;
    
    if (!attachment_path) {
      return res.status(400).json({ error: "Missing attachment_path parameter" });
    }
    
    await FileService.deleteFile(attachment_path);
    return res.status(200).json({ Message: "Success", status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(200).json({ Message: "Success", status: 200 });
  }
});

export default router;
