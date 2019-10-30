import { generateToken } from "../utils/jsonwebtoken";
import { openConnectionToTcpServerAndRequest } from '../tcp'
import { Request, Response } from 'express'

export const logoutUser = (req: Request, res: Response) => {
    req.session.id = null;
    req.session.pw = null;
    res.json({
        ok: true,
        error: null
    })
}


export const getUserInfo = (req: Request, res: Response) => {
    const { id, password } = req.body;
    const jsonData = {
        id,
        pw: password
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(
        0, 1, 1, 1, 0, 0, jsonData, res, 3, req
    )
}

export const login = (req, res) => {
    const {
        id,
        password
    } = req.body


    const jsonData = {
        id,
        pw: password
    }


    openConnectionToTcpServerAndRequest(
        0, 1, 1, 1, 0, 0, jsonData, res, 2, req, id, password
    )

    return;
}

export const newAccount = async (req, res) => {
    const {
        name,
        studentId,
        id,
        password,
        phoneNumber
    } = req.body;

    // Send data to python server

    // Response has token to make user login automatically. 
    const token = generateToken(id);
    res.json({
        ok: true,
        error: null,
        token
    })
    return;
}