import express from 'express'
import PrayerModel from '../models/Prayer'
import PrayerOfStudentModel from '../models/PrayerOfStudent'
import { IPrayerOfStudent, IPrayer } from '../types/types'

interface prayerOfStudent {
    name: string,
    prayerOfStudent: string
}

// 해당 날짜의 가장 최신의 오늘의 기도문 하나를 불러옴
interface getSpecificPrayerResult {
    ok: boolean,
    error: string,
    todaysPrayer: string,
    prayersOfStudent: IPrayerOfStudent[]
}

export async function getSpecificPrayer(req: express.Request, res: express.Response) {
    const { year, month, day } = req.params
    let result: getSpecificPrayerResult = {
        ok: true,
        error: null,
        todaysPrayer: "",
        prayersOfStudent: []
    }
    try {
        const prayers = await PrayerModel.find({
            year,
            month,
            day
        }).sort([['date', -1]])
        if (prayers.length === 0) {
            res.json(result)
            return
        }
        const prayer = prayers[0]
        // 그날의 기도문을 찾았으니, 해당 기도문에 속하는 학생들의 기도문들을 불러온다. 
        const prayersOfStudent = await PrayerOfStudentModel.find({
            prayerId: prayer.id
        })
        result.todaysPrayer = prayer.prayer
        result.prayersOfStudent = prayersOfStudent
        res.json(result)
        return

    } catch (err) {
        console.error(err.message)
        result.ok = false
        result.error = "기도문이 존재하지만 불러오는데 실패하였습니다. 관리자에게 에러를 보고해주세요!(컴쏘 이경민, 신동규, 신민철, 김용호)"
        res.json(result)
        return;
    }

}

// 가장 최신의 오늘의 기도문 하나를 불러옴
export async function getTodaysPrayer(req: express.Request, res: express.Response) {
    try {
        const prayer = await PrayerModel.find().sort([['date', -1]])
        const prayersOfStudents = await PrayerOfStudentModel.find({
            prayerId: prayer[0].id
        })

        res.json({
            ok: true,
            error: null,
            prayer: prayer[0],
            prayersOfStudents
        })
        return

    } catch (err) {
        console.log('Error Message: ', err.message)
        res.json({
            ok: false,
            error: "기도문을 불러오는데 실패하였습니다. ",
            prayer: null,
            prayersOfStudents: null
        })
        return
    }


}

// 오늘의 기도문 작성하기

interface postTodaysPrayerResult {
    ok: boolean,
    error: string,
    todaysPrayer: IPrayer,
    prayersOfStudent: IPrayerOfStudent[]
}

export async function postTodaysPrayer(req: express.Request, res: express.Response) {
    const { todaysPrayer } = req.body
    const prayersOfStudent: [prayerOfStudent] = req.body.prayersOfStudent
    let prayerOfStudentsList = []
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const result: postTodaysPrayerResult = {
        ok: true,
        error: null,
        todaysPrayer: null,
        prayersOfStudent: null
    }

    try {
        // 해당 날짜의 prayer 가 존재하는지 확인하자. 
        const existringPrayers = await PrayerModel.find({
            year,
            month,
            day
        }).sort([['date', -1]])

        if (existringPrayers.length === 0) {
            // 해당 날짜로 존재하는 기도문이 없을 경우, 기존과 동일
            const prayer = new PrayerModel({
                prayer: todaysPrayer,
                year,
                month,
                day
            })

            try {
                await prayer.save()

            } catch (err) {
                console.error('Error Message: ', err.message)
                result.ok = false
                result.error = "새로운 기도문을 생성하는데 실패"
                res.json(result)
                return;
            }

            await prayersOfStudent.map(async prayerOfStudent => {
                const studentPrayer = new PrayerOfStudentModel({
                    prayerId: prayer.id,
                    studentName: prayerOfStudent.name,
                    prayer: prayerOfStudent.prayerOfStudent
                })
                try {
                    await studentPrayer.save()
                } catch (err) {
                    console.error('Error Message: ', err.message)
                    result.ok = false
                    result.error = "새로운 학생 기도문을 저장하는데 실패"
                    res.json(result)
                    return;
                }
                prayerOfStudentsList.push(studentPrayer)
                if (prayersOfStudent.length === prayerOfStudentsList.length) {
                    result.todaysPrayer = prayer
                    result.prayersOfStudent = prayerOfStudentsList
                    res.json(result)
                    return
                }
            })

            return;
        } else {
            const existringPrayer = existringPrayers[0]
            existringPrayer.prayer = todaysPrayer
            try {
                await existringPrayer.save()
                // 기존에 존재하던 학생 기도문들을 전부 지운다
                const existingPrayersOfStudents = await PrayerOfStudentModel.find({
                    prayerId: existringPrayer.id
                })

                existingPrayersOfStudents.map(async cell => {
                    try {
                        await cell.remove()
                    } catch (err) {
                        result.ok = false
                        result.error = '학생들의 기도문을 지우던 도중에 에러발생'
                        res.json(result)
                        return
                    }
                })

                // 새로 학생들의 기도문을 생성해주고 데이터베이스에 저장해준다. 
                await prayersOfStudent.map(async prayerOfStudent => {
                    const studentPrayer = new PrayerOfStudentModel({
                        prayerId: existringPrayer.id,
                        studentName: prayerOfStudent.name,
                        prayer: prayerOfStudent.prayerOfStudent
                    })
                    try {
                        await studentPrayer.save()
                    } catch (err) {
                        console.error('Error Message: ', err.message)
                        result.ok = false
                        result.error = '새로운 학생 기도문을 만드는데 에러 발생'
                        res.json(result)
                        return;
                    }
                    prayerOfStudentsList.push(studentPrayer)
                    if (prayersOfStudent.length === prayerOfStudentsList.length) {
                        result.todaysPrayer = existringPrayer
                        result.prayersOfStudent = prayerOfStudentsList
                        res.json(result)
                        return
                    }
                })

            } catch (err) {
                console.error(err.message)
                result.ok = false
                result.error = "기도문을 변경하던 도중에 에러 발생",
                    res.json(result)
                return;
            }
        }
    } catch (err) {
        console.error(err.message)
        result.ok = false
        result.error = err.message
        res.json(result)
        return;
    }

}