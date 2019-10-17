"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = require("../controllers/test");
var router = express_1.default.Router();
router.get('/', test_1.testGet);
router.post('/', test_1.testPost);
exports.default = router;
