import express from 'express';
import { requestChapel } from '../controllers/chapel';
const router = express.Router();

router.post('', requestChapel)

export default router;