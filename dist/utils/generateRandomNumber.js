"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = function () {
    var number = Math.floor(1000 + Math.random() * 9000).toString();
    return number;
};
