const CryptoJS = require("crypto-js");
const config = require('../bin/env');
module.exports = {
    encryptString(string) {
        return CryptoJS.MD5(string, config.secret).toString();
    }
}