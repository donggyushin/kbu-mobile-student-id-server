import express from 'express';
import test from './test';
import verifyPhone from './VerifyPhone';
import user from './user'
import qrcode from './qrcode'
const router = express.Router();

router.use('/test', test)
router.use('/verifyphone', verifyPhone)
router.use('/user', user)
router.use('/qr', qrcode)

export default router;