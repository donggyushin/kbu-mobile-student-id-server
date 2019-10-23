import { openConnectionToTcpServerAndRequest } from '../tcp'
import { Request, Response } from 'express'

export const requestQrCode = (req: Request, res: Response) => {
    const { id, sid, token } = req.body;
    const jsonData = {
        id,
        sid,
        token
    }
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4);
}