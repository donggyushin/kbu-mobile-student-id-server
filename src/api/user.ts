import express from 'express';
import { newAccount, login } from '../controllers/user';
const router = express.Router()

router.post('/', newAccount)
router.post('/login', login)

export default router;