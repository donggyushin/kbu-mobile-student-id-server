"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var qrcode_1 = require("../controllers/qrcode");
var router = express_1.default.Router();
router.post('/', qrcode_1.requestQrCode);
router.post('/send', qrcode_1.sendQrcodeDataToSend);
exports.default = router;
