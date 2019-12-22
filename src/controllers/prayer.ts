import express from 'express'
import PrayerModel from '../models/Prayer'
import PrayerOfStudentModel from '../models/PrayerOfStudent'

interface prayerOfStudent {
    name: string,
    prayerOfStudent: string
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

export async function postTodaysPrayer(req: express.Request, res: express.Response) {
    const { todaysPrayer } = req.body
    const prayersOfStudent: [prayerOfStudent] = req.body.prayersOfStudent
    let prayerOfStudentsList = []


    const prayer = new PrayerModel({
        prayer: todaysPrayer,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
    })

    try {
        await prayer.save()

    } catch (err) {
        console.error('Error Message: ', err.message)
        res.json({
            ok: false,
            error: "Fail to create a new prayer instance",
            todaysPrayer: null,
            prayersOfStudent: null
        })
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
            res.json({
                ok: false,
                error: "Fail to create a new studentPrayer instance",
                todaysPrayer: null,
                prayersOfStudent: null
            })
            return;
        }
        prayerOfStudentsList.push(studentPrayer)
        if (prayersOfStudent.length === prayerOfStudentsList.length) {
            res.json({
                ok: true,
                error: null,
                todaysPrayer: prayer,
                prayersOfStudent: prayerOfStudentsList
            })

            return

        }
    })

    return;


}