import express from 'express';
import { requestLecture, requestOneLectureDetail } from '../controllers/lecture';
const router = express.Router();

router.post('', requestLecture);
router.post('/:lectureName', requestOneLectureDetail)

export default router;