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
// const END_POINT = '172.30.1.55'
var END_POINT = '192.210.53.188';
var DEPLOYMENT = '220.67.154.77';
exports.openConnectionToTcpServerAndRequest = function (protocolVersion, request, src, cipherType, cipherSet, bodyLength, jsonData, res, secondRequestNum) { return __awaiter(void 0, void 0, void 0, function () {
    var count, AES_KEY, iv, client, RSA_KEY, keyData, key;
    return __generator(this, function (_a) {
        count = 0;
        client = new net_1.default.Socket();
        RSA_KEY = fs_1.default.readFileSync(__dirname + '/key/private.pem');
        keyData = RSA_KEY.toString();
        key = new node_rsa_1.default();
        key.importKey(keyData, 'pkcs1');
        client.connect(9765, END_POINT, function () {
            console.log('TCP socket conneted!');
            var header = createHeaderProtocol_1.createHeaderProtocol(protocolVersion, request, src, cipherType, cipherSet, bodyLength);
            client.write(header);
        });
        client.on('data', function (data) {
            console.log('count = ', count);
            console.log('data: ', data);
            // 이게 필요 없눈뷰뷴인가?
            if (count === 0) {
                // 헤더값받아옴
                count += 1;
                var protocol_version = data.readUInt16BE(0);
                var request_number = data.readUInt16BE(2);
                var timestamp = data.readUInt32BE(4);
                var src_num = data.readUInt16BE(8);
                var cipher_type = data.readUInt8(10);
                var cipher_Set = data.readUInt16BE(11);
                var body_length = data.readUInt32BE(13);
                // let body_data = data.slice(17, body_length + 17);
                // console.log('경민이형한테 받은 암호화된 AES KEY: ', body_data);
                // const AES_KEY = body_data;
                // console.log('복호화된 AES KEY: ', key.decrypt(body_data));
                // iv = '1234567890123456';
                // const jsonDataToText = JSON.stringify(jsonData);
                // const mykey = crypto.createCipheriv('aes-256-cbc', body_data, iv);
                // let mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
                // mystr += mykey.final('base64');
                // const secondHeader = createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length)
                // console.log('second header');
                // client.write(secondHeader);
                // client.write(mystr);
                // // 여기까진 고정일거같음 근데 count 를 증가하면서 다음 data 를 받아와야 하는건지는 아직 의문....
                // // count += 1;
                // // Header 와 데이터
                // protocol_version = data.readUInt16BE(body_length + 17);
                // request_number = data.readUInt16BE(body_length + 19);
                // timestamp = data.readUInt32BE(body_length + 21);
                // src_num = data.readUInt16BE(body_length + 25);
                // cipher_type = data.readUInt8(body_length + 27);
                // cipher_Set = data.readUInt16BE(body_length + 28);
                // body_length = data.readUInt32BE(body_length + 30);
                // body_data = data.slice(body_length + 30, body_length + body_length + 30);
                // // 여기서 받은 body_data 는 암호화된 제이슨데이터가 버퍼로 오게될 것임
                // // 우선 AES 복호화먼저 실시
                // const mydescrpytkey = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                // let mystr2 = mykey.update(body_data)
                // // 그리고 텍스트 확인
                // console.log('mystr2: ', mystr2.toString('base64'));
                // // 제이슨 파싱
                // const responseJson = JSON.parse(mystr2.toString('base64'));
                // res.json(responseJson)
                // return;
            }
            else if (count === 1) {
                // Header 또는 data
                count += 1;
                console.log('here');
                // 암호값
                console.log('received: ', data);
                console.log('경민이형한테 받은 AES KEY:');
                console.log('decrypted: ', key.decrypt(data));
                AES_KEY = key.decrypt(data);
                console.log('AES_KEY: ', AES_KEY);
                // 여기부터 다시하자ㅂ!!
                iv = '1234567890123456';
                var jsonDataToText = JSON.stringify(jsonData);
                var mykey = crypto_1.default.createCipheriv('aes-256-cbc', AES_KEY, iv);
                var mystr = mykey.update(jsonDataToText, 'utf8', 'base64');
                mystr += mykey.final('base64');
                var secondHeader = createHeaderProtocol_1.createHeaderProtocol(protocolVersion, secondRequestNum, src, cipherType, cipherSet, mystr.length);
                console.log('second header: ', secondHeader);
                console.log('encrypted data: ', mystr);
                client.write(secondHeader);
                client.write(mystr);
            }
            else if (count === 2) {
                count = count + 1;
                console.log('last received data: ', data);
                var protocol_version = data.readUInt16BE(0);
                var request_number = data.readUInt16BE(2);
                var timestamp = data.readInt32BE(4);
                var src_num = data.readUInt16BE(8);
                var cipher_type = data.readUInt8(10);
                var cipher_Set = data.readUInt16BE(11);
                var body_length = data.readUInt32BE(13);
                var response_data = data.slice(17, body_length + 17);
                console.log('last protocol version', protocol_version);
                console.log('last request_number', request_number);
                console.log('last timestamp', timestamp);
                console.log('last src_num', src_num);
                console.log('last cipher_type', cipher_type);
                console.log('last cipher_Set', cipher_Set);
                console.log('last body_length', body_length);
                console.log('response data: ', response_data);
                // Base64 decode
                // const b64string = data.toString('base64');
                // const buf = Buffer.from(b64string, 'base64');
                // var mykey2 = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                // var mystr2 = mykey2.update(buf);
                // console.log(mystr2.toString('base64'));
                // count = 0
                // res.json({
                //     ok: true,
                //     error: null
                // })
            }
            else if (count === 3) {
                // data buffer 를 받으니까 우선 텍스트로 바꿔주고 AES 복호화 해주고 콘솔찍어보기
                console.log('here');
                data.toString('base64');
                var mykey = crypto_1.default.createDecipheriv('aes-256-cbc', AES_KEY, iv);
                var mystr = mykey.update(data.toString('base64'), 'base64', 'utf8');
                mystr += mykey.final('utf8');
                console.log(mystr);
                res.json(JSON.parse(mystr));
                count = 0;
                return;
            }
        });
        client.on('close', function () {
            count = 0;
            console.log('tcp connection closed');
        });
        return [2 /*return*/];
    });
}); };
