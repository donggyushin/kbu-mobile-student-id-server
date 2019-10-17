"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
require("./database/mongoose");
var PORT = 4000;
app_1.default.listen(PORT, function () { return console.log("KBU-MOBILE-STUDENT-ID-SERVER running on port " + PORT); });
