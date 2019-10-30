import { Request, Response } from 'express'
import { openConnectionToTcpServerAndRequest } from '../tcp'
export const requestNotice = (req: Request, res: Response) => {
    const { page } = req.body
    const jsonData = {
        page
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 11, req)
}