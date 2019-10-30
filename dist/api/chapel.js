"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chapel_1 = require("../controllers/chapel");
var router = express_1.default.Router();
router.post('', chapel_1.requestChapel);
exports.default = router;
