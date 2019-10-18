import { generateToken } from "../utils/jsonwebtoken";

export const login = async (req, res) => {
    const {
        id,
        password
    } = req.body

    // send data to python tcp server
    const token = generateToken(id);
    res.json({
        ok: true,
        error: null,
        token
    })
    return
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