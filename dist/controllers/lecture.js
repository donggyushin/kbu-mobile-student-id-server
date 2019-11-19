"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
var jsonwebtoken_1 = require("../utils/jsonwebtoken");
var testTcp_1 = require("../testTcp");
exports.requestLecture = function (req, res) {
    var _a = req.body, id = _a.id, pw = _a.pw;
    var jsonData = {
        id: id,
        pw: pw
    };
    // @ts-ignore
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 8, req);
};
exports.requestOneLectureDetail = function (req, res) {
    var token = req.body.token;
    var lectureName = req.params.lectureName;
    var decoded = jsonwebtoken_1.returnDecoded(token);
    // @ts-ignore
    var id = decoded.id, password = decoded.password;
    var jsonData = {
        id: id,
        pw: password,
        lecture_name: lectureName
    };
    // @ts-ignore
    testTcp_1.openConnectionToTcpServerAndRequest_TEST(0, 1, 1, 1, 0, 0, jsonData, res, 12, req);
};
