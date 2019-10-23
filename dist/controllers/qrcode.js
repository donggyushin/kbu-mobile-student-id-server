"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
exports.requestQrCode = function (req, res) {
    var _a = req.body, id = _a.id, sid = _a.sid, token = _a.token;
    var jsonData = {
        id: id,
        sid: sid,
        token: token
    };
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4);
};
