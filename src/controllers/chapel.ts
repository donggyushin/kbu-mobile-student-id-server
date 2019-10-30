import { openConnectionToTcpServerAndRequest } from '../tcp'

export const requestChapel = (req, res) => {
    const { id, pw } = req.body;
    const jsonData = {
        id,
        pw
    }
    // @ts-ignore
    openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 7, req);
}