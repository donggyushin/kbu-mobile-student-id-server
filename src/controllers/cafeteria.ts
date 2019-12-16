import axios from 'axios'
import cheerio from 'cheerio'
import { Request, Response, NextFunction } from 'express'
import { KBU_CAFETERIA_URL } from '../consts/endpoint'
const log = console.log

const getHtml = async (date) => {
    try {
        return await axios.get(`http://220.67.154.74:8080/SchoolFood/SelectMenuOutput.jsp?start=${date}&end=${date}`)
    } catch (error) {
        console.error(error)
    }
}

export const fetchCafeteria = (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.params
    console.log('date: ', date)
    getHtml(date)
        .then(html => {
            let uList = [];
            const $ = cheerio.load(html.data)
            const $bodyList = $("body");

            const data = JSON.parse($bodyList.text())
            res.json({
                ok: true,
                error: null,
                data
            })
        })
        .catch(err => {
            console.error(err.message)
            res.json({
                ok: false,
                error: '학식을 조회하는데 실패하였습니다. Error message: ' + err.message,
                data: null
            })
        })
}