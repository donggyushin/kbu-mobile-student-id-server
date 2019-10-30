"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var notice_1 = require("../controllers/notice");
var router = express_1.default.Router();
router.post('', notice_1.requestNotice);
exports.default = router;
