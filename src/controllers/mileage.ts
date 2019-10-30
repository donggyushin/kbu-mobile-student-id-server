import { Request, Response } from 'express'
import { openConnectionToTcpServerAndRequest } from '../tcp'

export const requestMileage = (req: Request, res: Response) => {
    const { id, pw } = req.body;
    const jsonData = {
        id,
        pw
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 9, req)
}