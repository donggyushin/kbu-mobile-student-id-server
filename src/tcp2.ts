import net from 'net'
import fs from 'fs';
import { createHeaderProtocol } from './utils/createHeaderProtocol';
import NodeRSA from 'node-rsa';
import { Response } from 'express'
import crypto from 'crypto'

// const END_POINT = '172.30.1.55'
const END_POINT = '192.210.53.188'
const DEPLOYMENT = '220.67.154.77'




export const openConnectionToTcpServerAndRequest = async (protocolVersion, request, src, cipherType, cipherSet, bodyLength, jsonData: object, res: Response, secondRequestNum: any) => {
    let count = 0;
    let AES_KEY;
    let iv;
    var client = new net.Socket();
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

    client.on('data', data => {
        console.log('count = ', count)
        console.log('data: ', data);
        // 이게 필요 없눈뷰뷴인가?
        if (count === 0) {
            // 헤더값받아옴

            count += 1;

            let protocol_version = data.readUInt16BE(0)
            let request_number = data.readUInt16BE(2)
            let timestamp = data.readUInt32BE(4)
            let src_num = data.readUInt16BE(8)
            let cipher_type = data.readUInt8(10)
            let cipher_Set = data.readUInt16BE(11)
            let body_length = data.readUInt32BE(13)





            // let body_data = data.slice(17, body_length + 17);

            // console.log('경민이형한테 받은 암호화된 AES KEY: ', body_data);
            // const AES_KEY = body_data;
            // console.log('복호화된 AES KEY: ', key.decrypt(body_data));

            // iv = '1234567890123456';
            // const jsonDataToText = JSON.stringify(jsonData);
            // const mykey = crypto.createCipheriv('aes-256-cbc', body_data, iv);
            // let mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
            // mystr += mykey.final('base64');
            // const secondHeader = createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length)
            // console.log('second header');
            // client.write(secondHeader);
            // client.write(mystr);
            // // 여기까진 고정일거같음 근데 count 를 증가하면서 다음 data 를 받아와야 하는건지는 아직 의문....




            // // count += 1;
            // // Header 와 데이터
            // protocol_version = data.readUInt16BE(body_length + 17);
            // request_number = data.readUInt16BE(body_length + 19);
            // timestamp = data.readUInt32BE(body_length + 21);
            // src_num = data.readUInt16BE(body_length + 25);
            // cipher_type = data.readUInt8(body_length + 27);
            // cipher_Set = data.readUInt16BE(body_length + 28);
            // body_length = data.readUInt32BE(body_length + 30);
            // body_data = data.slice(body_length + 30, body_length + body_length + 30);

            // // 여기서 받은 body_data 는 암호화된 제이슨데이터가 버퍼로 오게될 것임
            // // 우선 AES 복호화먼저 실시
            // const mydescrpytkey = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
            // let mystr2 = mykey.update(body_data)
            // // 그리고 텍스트 확인
            // console.log('mystr2: ', mystr2.toString('base64'));

            // // 제이슨 파싱
            // const responseJson = JSON.parse(mystr2.toString('base64'));
            // res.json(responseJson)
            // return;

        } else if (count === 1) {

            // Header 또는 data



            count += 1;
            console.log('here')
            // 암호값
            console.log('received: ', data)
            console.log('경민이형한테 받은 AES KEY:')
            console.log('decrypted: ', key.decrypt(data))
            AES_KEY = key.decrypt(data)
            console.log('AES_KEY: ', AES_KEY);
            // 여기부터 다시하자ㅂ!!
            iv = '1234567890123456';


            const jsonDataToText = JSON.stringify(jsonData);
            let mykey = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv);
            let mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
            mystr += mykey.final('base64');

            const secondHeader = createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length)
            console.log('second header: ', secondHeader)
            console.log('encrypted data: ', mystr);
            client.write(secondHeader);
            client.write(mystr);


        }
        else if (count === 2) {
            count = count + 1;
            console.log('last received data: ', data);
            const protocol_version = data.readUInt16BE(0)
            const request_number = data.readUInt16BE(2)
            const timestamp = data.readInt32BE(4)
            const src_num = data.readUInt16BE(8)
            const cipher_type = data.readUInt8(10)
            const cipher_Set = data.readUInt16BE(11)
            const body_length = data.readUInt32BE(13)
            const response_data = data.slice(17, body_length + 17);
            console.log('last protocol version', protocol_version)
            console.log('last request_number', request_number)
            console.log('last timestamp', timestamp)
            console.log('last src_num', src_num)
            console.log('last cipher_type', cipher_type)
            console.log('last cipher_Set', cipher_Set)
            console.log('last body_length', body_length)
            console.log('response data: ', response_data);


            // Base64 decode
            // const b64string = data.toString('base64');
            // const buf = Buffer.from(b64string, 'base64');
            // var mykey2 = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);

            // var mystr2 = mykey2.update(buf);
            // console.log(mystr2.toString('base64'));
            // count = 0
            // res.json({
            //     ok: true,
            //     error: null
            // })
        } else if (count === 3) {
            // data buffer 를 받으니까 우선 텍스트로 바꿔주고 AES 복호화 해주고 콘솔찍어보기
            console.log('here')
            data.toString('base64')
            const mykey = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
            let mystr = mykey.update(data.toString('base64'), 'base64', 'utf8');
            mystr += mykey.final('utf8');
            console.log(mystr);
            res.json(JSON.parse(mystr))
            count = 0;
            return;
        }
    })



    client.on('close', () => {
        count = 0;
        console.log('tcp connection closed')
    })
}
