"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var lecture_1 = require("../controllers/lecture");
var router = express_1.default.Router();
router.post('', lecture_1.requestLecture);
router.post('/:lectureName', lecture_1.requestOneLectureDetail);
exports.default = router;
