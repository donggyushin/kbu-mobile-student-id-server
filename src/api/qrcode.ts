import express from 'express';
import { requestQrCode, sendQrcodeDataToSend } from '../controllers/qrcode';
const router = express.Router();

router.post('/', requestQrCode)
router.post('/send', sendQrcodeDataToSend);

export default router;