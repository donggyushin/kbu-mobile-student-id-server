import express from 'express';
import test from './test';
import verifyPhone from './VerifyPhone';
import user from './user'
const router = express.Router();

router.use('/test', test)
router.use('/verifyphone', verifyPhone)
router.use('/user', user)

export default router;