import net from 'net'
import fs from 'fs';
import { createHeaderProtocol } from './utils/createHeaderProtocol';
import NodeRSA from 'node-rsa';
import { Response } from 'express'
import crypto from 'crypto'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';


// const END_POINT = '172.30.1.55'
let END_POINT = '192.210.56.239'
if (env === 'production') {
    END_POINT = '220.67.154.77'
}





export const openConnectionToTcpServerAndRequest = async (protocolVersion, request, src, cipherType, cipherSet, bodyLength, jsonData: object, res: Response, secondRequestNum: any) => {
    setTimeout(() => {
        return;
    }, 4500);
    let count = 0;
    let AES_KEY;
    let iv;
    var client = new net.Socket();
    let chunk;
    let N = 17;
    let header = true
    const RSA_KEY = fs.readFileSync(__dirname + '/key/private.pem');
    // console.log('privekey: ', RSA_KEY)
    // console.log('privekey2: ', RSA_KEY.toString())


    // Generating key from privKey by pkcs1
    const keyData = RSA_KEY.toString();

    let key = new NodeRSA();
    key.importKey(keyData, 'pkcs1')


    client.connect(9765, END_POINT, () => {
        console.log('TCP socket conneted!');

        const header = createHeaderProtocol(protocolVersion, request, src, cipherType, cipherSet, bodyLength);

        client.write(header)
    })


    client.on('readable', function () {
        while (null !== (chunk = client.read(N))) {
            console.log('got %d bytes of data', chunk.length);
            if (N === 17 && header) {
                const protocol_version = chunk.readUInt16BE(0)
                const request_number = chunk.readUInt16BE(2)
                const timestamp = chunk.readInt32BE(4)
                const src_num = chunk.readUInt16BE(8)
                const cipher_type = chunk.readUInt8(10)
                const cipher_Set = chunk.readUInt16BE(11)
                const body_length = chunk.readUInt32BE(13)
                header = false;
                N = body_length;
            } else if (count === 0) {
                count += 1;
                // 암호화된 AES_KEY 받는 부분
                AES_KEY = key.decrypt(chunk)
                // 여기부터 다시하자ㅂ!!
                iv = '1234567890123456';
                const jsonDataToText = JSON.stringify(jsonData);
                let mykey = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv);
                let mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
                mystr += mykey.final('base64');

                const secondHeader = createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length)

                client.write(secondHeader);
                client.write(mystr);
                header = true;
                N = 17;
            } else if (count === 1) {
                const mykey = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                let mystr = mykey.update(chunk.toString(), 'base64', 'utf8');
                mystr += mykey.final('utf8');
                header = true;
                N = 17;
                res.json(JSON.parse(mystr))
                return;
            }
        }
    })

    client.on('close', () => {
        count = 0;
        console.log('tcp connection closed')
    })
}

