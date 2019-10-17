import express from 'express';
import { testGet, testPost } from '../controllers/test';
const router = express.Router();

router.get('/', testGet)

router.post('/', testPost)

export default router;