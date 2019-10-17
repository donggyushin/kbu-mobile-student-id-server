"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var VerifyPhoneNumberSchema = new mongoose_1.default.Schema({
    number: String,
    verified: Boolean,
    name: String,
    date: { type: Date, default: Date.now }
});
var VerifyPhoneModel = mongoose_1.default.model('VerfiyPhone', VerifyPhoneNumberSchema);
exports.default = VerifyPhoneModel;
