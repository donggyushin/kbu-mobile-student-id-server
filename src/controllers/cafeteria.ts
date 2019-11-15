import axios from 'axios'
import cheerio from 'cheerio'
import { Request, Response, NextFunction } from 'express'
import { KBU_CAFETERIA_URL } from '../consts/endpoint'
const log = console.log

const getHtml = async () => {
    try {
        return await axios.get(KBU_CAFETERIA_URL)
    } catch (error) {
        console.error(error)
    }
}

export const fetchCafeteria = (req: Request, res: Response, next: NextFunction) => {
    getHtml()
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