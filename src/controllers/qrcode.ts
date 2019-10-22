import { openConnectionToTcpServerAndRequest } from '../tcp'
import { Request, Response } from 'express'

export const requestQrCode = (req: Request, res: Response) => {
    const { id, password } = req.body;
    const jsonData = {
        data: '1234'
    }
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4);
}