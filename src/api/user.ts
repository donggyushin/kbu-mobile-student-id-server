import express from 'express';
import { newAccount, login, getUserInfo, logoutUser } from '../controllers/user';
const router = express.Router()

router.post('/', newAccount)
router.post('/login', login)
router.post('/getuser', getUserInfo);
router.get('/logout', logoutUser)

export default router;