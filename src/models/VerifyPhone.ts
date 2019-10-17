import mongoose from 'mongoose';
import { IVerifyPhone } from '../types/types';

const VerifyPhoneNumberSchema = new mongoose.Schema({
    number: String,
    verified: Boolean,
    name: String,
    date: { type: Date, default: Date.now }
})

const VerifyPhoneModel: mongoose.Model<IVerifyPhone> = mongoose.model<IVerifyPhone>('VerfiyPhone', VerifyPhoneNumberSchema);


export default VerifyPhoneModel