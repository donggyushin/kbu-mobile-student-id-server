"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("./test"));
var VerifyPhone_1 = __importDefault(require("./VerifyPhone"));
var user_1 = __importDefault(require("./user"));
var qrcode_1 = __importDefault(require("./qrcode"));
var router = express_1.default.Router();
router.use('/test', test_1.default);
router.use('/verifyphone', VerifyPhone_1.default);
router.use('/user', user_1.default);
router.use('/qr', qrcode_1.default);
exports.default = router;
