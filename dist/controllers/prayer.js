"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Prayer_1 = __importDefault(require("../models/Prayer"));
var PrayerOfStudent_1 = __importDefault(require("../models/PrayerOfStudent"));
function getSpecificPrayer(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, year, month, day, result, prayers, prayer, prayersOfStudent, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, year = _a.year, month = _a.month, day = _a.day;
                    result = {
                        ok: true,
                        error: null,
                        todaysPrayer: "",
                        prayersOfStudent: []
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Prayer_1.default.find({
                            year: year,
                            month: month,
                            day: day
                        }).sort([['date', -1]])];
                case 2:
                    prayers = _b.sent();
                    if (prayers.length === 0) {
                        res.json(result);
                        return [2 /*return*/];
                    }
                    prayer = prayers[0];
                    return [4 /*yield*/, PrayerOfStudent_1.default.find({
                            prayerId: prayer.id
                        })];
                case 3:
                    prayersOfStudent = _b.sent();
                    result.todaysPrayer = prayer.prayer;
                    result.prayersOfStudent = prayersOfStudent;
                    res.json(result);
                    return [2 /*return*/];
                case 4:
                    err_1 = _b.sent();
                    console.error(err_1.message);
                    result.ok = false;
                    result.error = "기도문이 존재하지만 불러오는데 실패하였습니다. 관리자에게 에러를 보고해주세요!(컴쏘 이경민, 신동규, 신민철, 김용호)";
                    res.json(result);
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getSpecificPrayer = getSpecificPrayer;
// 가장 최신의 오늘의 기도문 하나를 불러옴
function getTodaysPrayer(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var prayer, prayersOfStudents, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Prayer_1.default.find().sort([['date', -1]])];
                case 1:
                    prayer = _a.sent();
                    return [4 /*yield*/, PrayerOfStudent_1.default.find({
                            prayerId: prayer[0].id
                        })];
                case 2:
                    prayersOfStudents = _a.sent();
                    res.json({
                        ok: true,
                        error: null,
                        prayer: prayer[0],
                        prayersOfStudents: prayersOfStudents
                    });
                    return [2 /*return*/];
                case 3:
                    err_2 = _a.sent();
                    console.log('Error Message: ', err_2.message);
                    res.json({
                        ok: false,
                        error: "기도문을 불러오는데 실패하였습니다. ",
                        prayer: null,
                        prayersOfStudents: null
                    });
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTodaysPrayer = getTodaysPrayer;
function postTodaysPrayer(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var todaysPrayer, prayersOfStudent, prayerOfStudentsList, date, year, month, day, result, existringPrayers, prayer_1, err_3, existringPrayer_1, existingPrayersOfStudents, err_4, err_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todaysPrayer = req.body.todaysPrayer;
                    prayersOfStudent = req.body.prayersOfStudent;
                    prayerOfStudentsList = [];
                    date = new Date();
                    year = date.getFullYear();
                    month = date.getMonth();
                    day = date.getDate();
                    result = {
                        ok: true,
                        error: null,
                        todaysPrayer: null,
                        prayersOfStudent: null
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 15, , 16]);
                    return [4 /*yield*/, Prayer_1.default.find({
                            year: year,
                            month: month,
                            day: day
                        }).sort([['date', -1]])];
                case 2:
                    existringPrayers = _a.sent();
                    if (!(existringPrayers.length === 0)) return [3 /*break*/, 8];
                    prayer_1 = new Prayer_1.default({
                        prayer: todaysPrayer,
                        year: year,
                        month: month,
                        day: day
                    });
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, prayer_1.save()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    console.error('Error Message: ', err_3.message);
                    result.ok = false;
                    result.error = "새로운 기도문을 생성하는데 실패";
                    res.json(result);
                    return [2 /*return*/];
                case 6: return [4 /*yield*/, prayersOfStudent.map(function (prayerOfStudent) { return __awaiter(_this, void 0, void 0, function () {
                        var studentPrayer, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    studentPrayer = new PrayerOfStudent_1.default({
                                        prayerId: prayer_1.id,
                                        studentName: prayerOfStudent.name,
                                        prayer: prayerOfStudent.prayerOfStudent
                                    });
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, studentPrayer.save()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_6 = _a.sent();
                                    console.error('Error Message: ', err_6.message);
                                    result.ok = false;
                                    result.error = "새로운 학생 기도문을 저장하는데 실패";
                                    res.json(result);
                                    return [2 /*return*/];
                                case 4:
                                    prayerOfStudentsList.push(studentPrayer);
                                    if (prayersOfStudent.length === prayerOfStudentsList.length) {
                                        result.todaysPrayer = prayer_1;
                                        result.prayersOfStudent = prayerOfStudentsList;
                                        res.json(result);
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
                case 8:
                    existringPrayer_1 = existringPrayers[0];
                    existringPrayer_1.prayer = todaysPrayer;
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 13, , 14]);
                    return [4 /*yield*/, existringPrayer_1.save()
                        // 기존에 존재하던 학생 기도문들을 전부 지운다
                    ];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, PrayerOfStudent_1.default.find({
                            prayerId: existringPrayer_1.id
                        })];
                case 11:
                    existingPrayersOfStudents = _a.sent();
                    existingPrayersOfStudents.map(function (cell) { return __awaiter(_this, void 0, void 0, function () {
                        var err_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, cell.remove()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_7 = _a.sent();
                                    result.ok = false;
                                    result.error = '학생들의 기도문을 지우던 도중에 에러발생';
                                    res.json(result);
                                    return [2 /*return*/];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // 새로 학생들의 기도문을 생성해주고 데이터베이스에 저장해준다. 
                    return [4 /*yield*/, prayersOfStudent.map(function (prayerOfStudent) { return __awaiter(_this, void 0, void 0, function () {
                            var studentPrayer, err_8;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        studentPrayer = new PrayerOfStudent_1.default({
                                            prayerId: existringPrayer_1.id,
                                            studentName: prayerOfStudent.name,
                                            prayer: prayerOfStudent.prayerOfStudent
                                        });
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, studentPrayer.save()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_8 = _a.sent();
                                        console.error('Error Message: ', err_8.message);
                                        result.ok = false;
                                        result.error = '새로운 학생 기도문을 만드는데 에러 발생';
                                        res.json(result);
                                        return [2 /*return*/];
                                    case 4:
                                        prayerOfStudentsList.push(studentPrayer);
                                        if (prayersOfStudent.length === prayerOfStudentsList.length) {
                                            result.todaysPrayer = existringPrayer_1;
                                            result.prayersOfStudent = prayerOfStudentsList;
                                            res.json(result);
                                            return [2 /*return*/];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 12:
                    // 새로 학생들의 기도문을 생성해주고 데이터베이스에 저장해준다. 
                    _a.sent();
                    return [3 /*break*/, 14];
                case 13:
                    err_4 = _a.sent();
                    console.error(err_4.message);
                    result.ok = false;
                    result.error = "기도문을 변경하던 도중에 에러 발생",
                        res.json(result);
                    return [2 /*return*/];
                case 14: return [3 /*break*/, 16];
                case 15:
                    err_5 = _a.sent();
                    console.error(err_5.message);
                    result.ok = false;
                    result.error = err_5.message;
                    res.json(result);
                    return [2 /*return*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.postTodaysPrayer = postTodaysPrayer;
