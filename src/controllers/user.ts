import { generateToken } from "../utils/jsonwebtoken";
import { openConnectionToTcpServerAndRequest } from '../tcp'

export const getUserInfo = (req, res) => {
    const { id, password } = req.body;
    const jsonData = {
        id,
        pw: password
    }

    openConnectionToTcpServerAndRequest(
        0, 1, 1, 1, 0, 0, jsonData, res, 3
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
        0, 1, 1, 1, 0, 0, jsonData, res, 2
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