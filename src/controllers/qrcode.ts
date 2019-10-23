import { openConnectionToTcpServerAndRequest } from '../tcp'
import { Request, Response } from 'express'

export const sendQrcodeDataToSend = (req: Request, res: Response) => {
    const { token } = req.body;

    const jsonData = {
        token
    }
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 5);
}

export const requestQrCode = (req: Request, res: Response) => {
    const { id, sid, token } = req.body;
    const jsonData = {
        id,
        sid,
        token
    }
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4);
}