"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
exports.sendSMSMEssage = function (to, text) {
    axios_1.default.post(process.env.NEXMO_URL, {
        api_key: process.env.NEXMO_KEY,
        api_secret: process.env.NEXMO_SECRET,
        to: to,
        from: "피자호빵",
        text: text
    })
        .then(function (res) { return console.log(res.status); })
        .catch(function (err) {
        var today = new Date().toString();
        var errorMessage = "(" + today + ")Error occured in sending sms message: " + err + " ";
        console.error("Error occured in sending sms message: ", err);
        fs_1.default.appendFile(__dirname + "/../logs/sendingSMS", errorMessage, function (err) {
            if (err) {
                console.error('Failed to write file, ', err);
            }
            else {
                console.log('The file was saved!');
            }
        });
    });
};
