"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
exports.requestMileage = function (req, res) {
    var _a = req.body, id = _a.id, pw = _a.pw;
    var jsonData = {
        id: id,
        pw: pw
    };
    // @ts-ignore
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 9, req);
};
