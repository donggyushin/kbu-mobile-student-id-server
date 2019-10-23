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
var net_1 = __importDefault(require("net"));
var fs_1 = __importDefault(require("fs"));
var createHeaderProtocol_1 = require("./utils/createHeaderProtocol");
var node_rsa_1 = __importDefault(require("node-rsa"));
var crypto_1 = __importDefault(require("crypto"));
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
// const END_POINT = '172.30.1.55'
var END_POINT = '192.210.56.239';
if (env === 'production') {
    END_POINT = '220.67.154.77';
}
exports.openConnectionToTcpServerAndRequest = function (protocolVersion, request, src, cipherType, cipherSet, bodyLength, jsonData, res, secondRequestNum) { return __awaiter(void 0, void 0, void 0, function () {
    var count, AES_KEY, iv, client, chunk, N, header, RSA_KEY, keyData, key;
    return __generator(this, function (_a) {
        setTimeout(function () {
            return;
        }, 4500);
        count = 0;
        client = new net_1.default.Socket();
        N = 17;
        header = true;
        RSA_KEY = fs_1.default.readFileSync(__dirname + '/key/private.pem');
        keyData = RSA_KEY.toString();
        key = new node_rsa_1.default();
        key.importKey(keyData, 'pkcs1');
        client.connect(9765, END_POINT, function () {
            console.log('TCP socket conneted!');
            var header = createHeaderProtocol_1.createHeaderProtocol(protocolVersion, request, src, cipherType, cipherSet, bodyLength);
            client.write(header);
        });
        client.on('readable', function () {
            while (null !== (chunk = client.read(N))) {
                console.log('got %d bytes of data', chunk.length);
                if (N === 17 && header) {
                    var protocol_version = chunk.readUInt16BE(0);
                    var request_number = chunk.readUInt16BE(2);
                    var timestamp = chunk.readInt32BE(4);
                    var src_num = chunk.readUInt16BE(8);
                    var cipher_type = chunk.readUInt8(10);
                    var cipher_Set = chunk.readUInt16BE(11);
                    var body_length = chunk.readUInt32BE(13);
                    header = false;
                    N = body_length;
                }
                else if (count === 0) {
                    count += 1;
                    // 암호화된 AES_KEY 받는 부분
                    AES_KEY = key.decrypt(chunk);
                    // 여기부터 다시하자ㅂ!!
                    iv = '1234567890123456';
                    var jsonDataToText = JSON.stringify(jsonData);
                    var mykey = crypto_1.default.createCipheriv('aes-256-cbc', AES_KEY, iv);
                    var mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
                    mystr += mykey.final('base64');
                    var secondHeader = createHeaderProtocol_1.createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length);
                    client.write(secondHeader);
                    client.write(mystr);
                    header = true;
                    N = 17;
                }
                else if (count === 1) {
                    var mykey = crypto_1.default.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                    var mystr = mykey.update(chunk.toString(), 'base64', 'utf8');
                    mystr += mykey.final('utf8');
                    header = true;
                    N = 17;
                    res.json(JSON.parse(mystr));
                    return;
                }
            }
        });
        client.on('close', function () {
            count = 0;
            console.log('tcp connection closed');
        });
        return [2 /*return*/];
    });
}); };
