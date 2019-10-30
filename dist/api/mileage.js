"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mileage_1 = require("../controllers/mileage");
var router = express_1.default.Router();
router.post('', mileage_1.requestMileage);
exports.default = router;
