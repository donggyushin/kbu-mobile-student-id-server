import express from 'express';
import { requestMileage } from '../controllers/mileage';
const router = express.Router();

router.post('', requestMileage)

export default router;