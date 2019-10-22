"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
exports.requestQrCode = function (req, res) {
    var _a = req.body, id = _a.id, password = _a.password;
    var jsonData = {
        data: '1234'
    };
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 4);
};
