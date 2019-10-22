"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
require("./database/mongoose");
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var privateKey = fs_1.default.readFileSync(__dirname + '/key/priv.pem');
var certificate = fs_1.default.readFileSync(__dirname + '/key/cert.pem');
var credentials = {
    key: privateKey,
    cert: certificate
};
var PORT = 4000;
var httpServer = http_1.default.createServer(app_1.default);
var httpsServer = https_1.default.createServer(credentials, app_1.default);
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'env';
if (env === 'env') {
    httpServer.listen(PORT, function () { return console.log("KBU WAS http server listening on " + PORT); });
}
else {
    httpsServer.listen(PORT, function () { return console.log("KBU WAS https server listening on " + PORT); });
}
// App.listen(PORT, () => console.log(`KBU-MOBILE-STUDENT-ID-SERVER running on port ${PORT}`))
