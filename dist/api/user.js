"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var router = express_1.default.Router();
router.post('/', user_1.newAccount);
router.post('/login', user_1.login);
router.post('/getuser', user_1.getUserInfo);
exports.default = router;
