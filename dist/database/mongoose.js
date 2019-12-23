"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var DB_ENDPOINT = "mongodb://localhost/kbumobilestudentid";
var env = process.env.NODE_ENV || 'env';
if (env === 'production') {
    DB_ENDPOINT = process.env.DATABASE_ENDPOINT_PRD;
}
else if (env === 'docker') {
}
mongoose_1.default.connect(DB_ENDPOINT, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () { return console.log("\u2705 database connected!"); });
