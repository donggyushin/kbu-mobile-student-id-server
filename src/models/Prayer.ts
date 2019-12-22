import mongoose from 'mongoose'
import { IPrayer } from '../types/types'

const PrayerSchema = new mongoose.Schema({
    prayer: String,
    date: { type: Date, default: Date.now },
    year: Number,
    month: Number,
    day: Number
})

const PrayerModel: mongoose.Model<IPrayer> = mongoose.model<IPrayer>('prayer', PrayerSchema)
export default PrayerModel