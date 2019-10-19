import net from 'net'
import fs from 'fs';
import { createHeaderProtocol } from './utils/createHeaderProtocol';
import { decryptRsaMessage } from './utils/decryptRsa';
import NodeRSA from 'node-rsa';


const RSA_KEY = fs.readFileSync(__dirname + '/key/private.pem');
// console.log('privekey: ', RSA_KEY)
// console.log('privekey2: ', RSA_KEY.toString())


// Generating key from privKey by pkcs1
const keyData = RSA_KEY.toString();
const key = new NodeRSA();
key.importKey(keyData, 'pkcs1')


var client = new net.Socket();
let header = createHeaderProtocol(
    0,
    1,
    1,
    1,
    0,
    0
)

console.log("header: ", header)


client.connect(8080, '172.30.1.6', function () {

    console.log('TCP socet connected');
    client.write(header)
});


client.on('data', async data => {
    console.log('received: ', data)
    console.log('decrypted: ', key.decrypt(data).toString('base64').toString())

})

client.on('close', () => {
    console.log('tcp connection closed')
})


