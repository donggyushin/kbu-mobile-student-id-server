import jwt from 'jsonwebtoken';

const secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY

export const generateToken = (id: string): string => {
    const token = jwt.sign({ id }, secretKey);
    return token
}

export const decodeToken = (token: string): string => {
    const decoded = jwt.verify(token, secretKey);
    // @ts-ignore
    return decoded.id
}