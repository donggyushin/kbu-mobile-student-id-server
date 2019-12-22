import mongoose from 'mongoose'
import { IPrayerOfStudent } from '../types/types'

const PrayerOfStudentSchema: mongoose.Schema = new mongoose.Schema({
    prayerId: String,
    studentName: String,
    date: { type: Date, default: Date.now },
    prayer: String
})

const PrayerOfStudentModel: mongoose.Model<IPrayerOfStudent> = mongoose.model<IPrayerOfStudent>('prayerOfStudent', PrayerOfStudentSchema)

export default PrayerOfStudentModel

