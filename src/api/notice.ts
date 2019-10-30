import express from 'express';
import { requestNotice } from '../controllers/notice';
const router = express.Router();

router.post('', requestNotice)

export default router;