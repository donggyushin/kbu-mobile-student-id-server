"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testGet = function (req, res) {
    res.json({
        ok: true,
        error: null,
    });
};
exports.testPost = function (req, res) {
    // @ts-ignore
    res.json({
        ok: true,
        error: null,
        data: req.body.data
    });
};
