import { openConnectionToTcpServerAndRequest } from '../tcp'
import { Request, Response } from 'express'

export const sendQrcodeDataToSend = (req: Request, res: Response) => {
    const { token } = req.body;

    const jsonData = {
        token
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 5, req);
}

export const requestQrCode = (req: Request, res: Response) => {
    const { id, sid, token } = req.body;
    const jsonData = {
        id,
        sid,
        token
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4, req);
}