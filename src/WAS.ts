import App from './app';
import './database/mongoose'
import fs from 'fs';
import http from 'http';
import https from 'https';
const privateKey = fs.readFileSync(__dirname + '/key/priv.pem');
const certificate = fs.readFileSync(__dirname + '/key/cert.pem');
const credentials = {
    key: privateKey,
    cert: certificate
}

const PORT = 4000

const httpServer = http.createServer(App);
const httpsServer = https.createServer(credentials, App);

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'env';

if (env === 'env') {
    httpServer.listen(PORT, () => console.log(`KBU WAS http server listening on ${PORT}`))
} else {
    httpsServer.listen(PORT, () => console.log(`KBU WAS https server listening on ${PORT}`));
}





// App.listen(PORT, () => console.log(`KBU-MOBILE-STUDENT-ID-SERVER running on port ${PORT}`))