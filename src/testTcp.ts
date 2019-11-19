import net from 'net'
import fs from 'fs'
import { createHeaderProtocol } from './utils/createHeaderProtocol'
import NodeRSA from 'node-rsa'
import { Response } from 'express'
import crypto from 'crypto'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'

let END_POINT = '220.67.154.77'
if (env === 'production') {
    END_POINT = '220.67.154.77'
}

export const openConnectionToTcpServerAndRequest_TEST = async (protocolVersion, request, src, cipherType, cipherSet, bodyLength, jsonData: object, res: Response, secondRequestNum: any, req, id: string, pw: string) => {

    let count = 0
    let AES_KEY
    let iv;
    var client = new net.Socket()
    let chunk
    let N = 17
    let header = true
    const RSA_KEY = fs.readFileSync(__dirname + '/key/private.pem')

    const keyData = RSA_KEY.toString()

    let key: NodeRSA = new NodeRSA()
    key.importKey(keyData, 'pkcs1')

    client.connect(1487, END_POINT, () => {
        console.log('TCP Test socket connected!')

        const header = createHeaderProtocol(protocolVersion, request, src, cipherType, cipherSet, bodyLength)
        client.write(header)
    })

    client.on('readable', function () {
        while (null !== (chunk = client.read(N))) {
            if (N === 17 && header) {
                const body_length = chunk.readUInt32BE(13)
                header = false
                N = body_length
            } else if (count === 0) {
                count += 1

                AES_KEY = key.decrypt(chunk)

                iv = '1234567890123456'
                const jsonDataToText = JSON.stringify(jsonData)
                let mykey = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv)
                let mystr = mykey.update(jsonDataToText, 'utf8', 'base64')
                mystr += mykey.final('base64')

                const secondHeader = createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length)

                client.write(secondHeader)
                client.write(mystr)

                header = true
                N = 17
            } else if (count === 1) {
                const mykey = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                let mystr = mykey.update(chunk.toString(), 'base64', 'utf8')
                mystr += mykey.final('utf8')
                header = true
                N = 17
                if (secondRequestNum === 2) {
                    const resultJson = JSON.parse(mystr);

                    if (resultJson.is_ok) {

                    }
                }

                res.json(JSON.parse(mystr))
                return
            }
        }
    })

    client.on('close', () => {
        count = 0;
        console.log('tcp 연결이 끊켰습니다. ')
    })
}