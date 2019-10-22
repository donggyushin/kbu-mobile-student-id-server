"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var VerifyPhone_1 = require("../controllers/VerifyPhone");
var router = express_1.default.Router();
router.post('/', VerifyPhone_1.AllocateVerifyKeyAndSendSMS);
router.post('/verify', VerifyPhone_1.VerifyCode);
exports.default = router;
