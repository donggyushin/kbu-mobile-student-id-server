"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PrayerSchema = new mongoose_1.default.Schema({
    prayer: String,
    date: { type: Date, default: Date.now },
    year: Number,
    month: Number,
    day: Number
});
var PrayerModel = mongoose_1.default.model('prayer', PrayerSchema);
exports.default = PrayerModel;
