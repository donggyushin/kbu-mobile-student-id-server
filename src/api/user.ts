import express from 'express';
import { newAccount, login, getUserInfo } from '../controllers/user';
const router = express.Router()

router.post('/', newAccount)
router.post('/login', login)
router.post('/getuser', getUserInfo);

export default router;