"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeaderProtocol = function (protocolVersion, request, src, cipherType, cipherSet, bodyLength) {
    // protocolVersion 은 2byte만 담을 수 있습니다. 
    var buf1 = Buffer.alloc(2);
    buf1.writeUInt16BE(protocolVersion, 0);
    var buf2 = Buffer.alloc(2);
    buf2.writeUInt16BE(request, 0);
    var buf3 = Buffer.alloc(4);
    var real_timestamp = parseInt((new Date().getTime() * 0.001).toString());
    buf3.writeUInt32BE(real_timestamp, 0);
    var buf4 = Buffer.alloc(2);
    buf4.writeUInt16BE(src, 0);
    var buf5 = Buffer.alloc(1);
    buf5.writeUInt8(cipherType, 0);
    var buf6 = Buffer.alloc(2);
    buf6.writeUInt16BE(cipherSet, 0);
    var buf7 = Buffer.alloc(4);
    buf7.writeUInt32BE(bodyLength, 0);
    console.log('buffer total length: ', buf1.length +
        buf2.length +
        buf3.length +
        buf4.length +
        buf5.length +
        buf6.length +
        buf7.length);
    var header = Buffer.concat([
        buf1,
        buf2,
        buf3,
        buf4,
        buf5,
        buf6,
        buf7
    ], 17);
    return header;
};
