import express from 'express';
import test from './test';
import verifyPhone from './VerifyPhone';
import user from './user'
import qrcode from './qrcode'
import chapel from './chapel'
import lecture from './lecture';
import mileage from './mileage'
const router = express.Router();

router.use('/test', test)
router.use('/verifyphone', verifyPhone)
router.use('/user', user)
router.use('/qr', qrcode)
router.use('/chapel', chapel)
router.use('/lecture', lecture)
router.use('/mileage', mileage)

export default router;