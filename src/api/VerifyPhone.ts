import express, { Router } from 'express';
import { AllocateVerifyKeyAndSendSMS, VerifyCode } from '../controllers/VerifyPhone'
const router: Router = express.Router()

router.post('/', AllocateVerifyKeyAndSendSMS)
router.post('/verify', VerifyCode)

export default router;