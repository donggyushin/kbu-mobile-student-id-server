import express from 'express'
import { postTodaysPrayer, getTodaysPrayer } from '../controllers/prayer';
const router = express.Router()

router.post('', postTodaysPrayer)
router.get('', getTodaysPrayer)

export default router;