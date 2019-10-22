// var crypto, cipher, decipher,
//     key, iv,
//     before_cipher, after_cipher, deciphered, buf;

// crypto = require('crypto');

// // key = new Buffer('12345678901234567890123456789012', 'utf8');
// // iv = new Buffer('1234567890123456', 'utf8');

// key = '12345678901234567890123456789012'
// iv = '1234567890123456'

// before_cipher = '1234567890123456';
// console.log('Input string: ' + before_cipher);

// var mykey = crypto.createCipheriv('aes-256-cbc', key, iv);
// var mystr = mykey.update(before_cipher, 'utf8', 'base64')
// mystr += mykey.final('base64');

// console.log(mystr);
// console.log('e5RnnlJkv4QGnGhkMwfvgAqeGV4ojEKWXomSFQBCVwE=' === 'e5RnnlJkv4QGnGhkMwfvgAqeGV4ojEKWXomSFQBCVwE=')