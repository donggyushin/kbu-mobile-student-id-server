"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PrayerOfStudentSchema = new mongoose_1.default.Schema({
    prayerId: String,
    studentName: String,
    date: { type: Date, default: Date.now },
    prayer: String
});
var PrayerOfStudentModel = mongoose_1.default.model('prayerOfStudent', PrayerOfStudentSchema);
exports.default = PrayerOfStudentModel;
