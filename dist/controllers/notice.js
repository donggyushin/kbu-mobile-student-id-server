"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tcp_1 = require("../tcp");
exports.requestNotice = function (req, res) {
    var page = req.body.page;
    var jsonData = {
        page: page
    };
    // @ts-ignore
    tcp_1.openConnectionToTcpServerAndRequest(0, 1, 1, 1, 0, 0, jsonData, res, 11, req);
};
