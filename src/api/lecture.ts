import express from 'express';
import { requestLecture } from '../controllers/lecture';
const router = express.Router();

router.post('', requestLecture);

export default router;