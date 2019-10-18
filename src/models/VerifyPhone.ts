import mongoose from 'mongoose';
import { IVerifyPhone } from '../types/types';

const VerifyPhoneNumberSchema: mongoose.Schema = new mongoose.Schema({
    number: String,
    verified: { type: Boolean, default: false },
    name: String,
    date: { type: Date, default: Date.now },
    key: String,
    studentId: String
})

const VerifyPhoneModel: mongoose.Model<IVerifyPhone> = mongoose.model<IVerifyPhone>('VerfiyPhone', VerifyPhoneNumberSchema);


export default VerifyPhoneModel