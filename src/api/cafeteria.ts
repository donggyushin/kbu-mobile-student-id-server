import express from 'express'
import { fetchCafeteria } from '../controllers/cafeteria'
const router = express.Router()

router.get('', fetchCafeteria)

export default router