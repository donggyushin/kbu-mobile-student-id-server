import { Request, Response } from 'express'
import { openConnectionToTcpServerAndRequest } from '../tcp';
import { returnDecoded } from '../utils/jsonwebtoken';
import { openConnectionToTcpServerAndRequest_TEST } from '../testTcp';

export const requestLecture = (req: Request, res: Response) => {
    const { id, pw } = req.body;
    const jsonData = {
        id,
        pw
    }

    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 8, req)
}

export const requestOneLectureDetail = (req: Request, res: Response) => {
    const { token } = req.body
    const { lectureName } = req.params
    const decoded = returnDecoded(token);
    // @ts-ignore
    const { id, password } = decoded
    const jsonData = {
        id,
        pw: password,
        lecture_name: lectureName
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest_TEST(0, 1, 1, 1, 0, 0, jsonData, res, 12, req)
}