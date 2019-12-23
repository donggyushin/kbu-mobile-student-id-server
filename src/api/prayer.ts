import express from 'express'
import { postTodaysPrayer, getTodaysPrayer, getSpecificPrayer } from '../controllers/prayer';
const router = express.Router()

router.post('', postTodaysPrayer)
router.get('', getTodaysPrayer)
router.get('/:year/:month/:day', getSpecificPrayer)

export default router;