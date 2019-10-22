import express from 'express';
import { requestQrCode } from '../controllers/qrcode';
const router = express.Router();

router.post('/', requestQrCode)

export default router;