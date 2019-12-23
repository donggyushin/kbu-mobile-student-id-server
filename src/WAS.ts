import App from './app';
import './database/mongoose'
import fs from 'fs';
import http from 'http';
import https from 'https';
const privateKey = fs.readFileSync(__dirname + '/key/priv.pem');
const certificate = fs.readFileSync(__dirname + '/key/cert.pem');
const chain = fs.readFileSync(__dirname + '/key/chain.pem')
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: chain
}

const PORT = process.env.PORT

const httpServer = http.createServer(App);
const httpsServer = https.createServer(credentials, App);

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'env';

console.log('env: ', env)

if (env === 'env') {
    httpServer.listen(PORT, () => console.log(`KBU WAS http server listening on ${PORT}`))
} else if (env === 'production') {
    httpsServer.listen(PORT, () => console.log(`KBU WAS https server listening on ${PORT}`));
} else if (env === 'docker') {
    httpServer.listen(PORT, () => console.log(`KBU WAS http server listening on ${PORT}`))
}





// App.listen(PORT, () => console.log(`KBU-MOBILE-STUDENT-ID-SERVER running on port ${PORT}`))