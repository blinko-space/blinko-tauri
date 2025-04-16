import express from 'express';
import { FileService } from '../../lib/files';
import { getToken } from '../../lib/helper';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const token = await getToken(req);
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
