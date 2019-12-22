import mognoose from 'mongoose'

export interface IVerifyPhone extends mognoose.Document {
    number: string,
    verified: boolean,
    name: string,
    date: string,
    key: string,
    studentId: string
}

export interface IPrayerOfStudent extends mognoose.Document {
    prayerId: string,
    studentName: string,
    date: string,
    prayer: string
}

export interface IPrayer extends mognoose.Document {
    prayer: string,
    date: string,
    year: number,
    month: number,
    day: number
}

export interface PrayerResponse {
    ok: boolean,
    error: string,
    prayer: IPrayer,
    prayersOfStudent: [IPrayerOfStudent]
}