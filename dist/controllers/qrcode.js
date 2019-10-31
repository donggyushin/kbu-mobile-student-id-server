"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
exports.sendQrcodeDataToSend = function (req, res) {
    var token = req.body.token;
    var jsonData = {
        token: token
    };
    // @ts-ignore
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 5, req);
};
exports.requestQrCode = function (req, res) {
    var _a = req.body, id = _a.id, sid = _a.sid, token = _a.token, name = _a.name;
    var jsonData = {
        id: id,
        sid: sid,
        token: token,
        name: name
    };
    // @ts-ignore
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4, req);
};
