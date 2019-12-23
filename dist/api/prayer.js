"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var prayer_1 = require("../controllers/prayer");
var router = express_1.default.Router();
router.post('', prayer_1.postTodaysPrayer);
router.get('', prayer_1.getTodaysPrayer);
router.get('/:year/:month/:day', prayer_1.getSpecificPrayer);
exports.default = router;
