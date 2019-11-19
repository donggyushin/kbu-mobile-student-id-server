"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY;
exports.generateToken = function (id) {
    var token = jsonwebtoken_1.default.sign({ id: id }, secretKey);
    return token;
};
exports.decodeToken = function (token) {
    var decoded = jsonwebtoken_1.default.verify(token, secretKey);
    // @ts-ignore
    return decoded.id;
};
exports.returnDecoded = function (token) {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
