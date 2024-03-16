const crypto = require("node:crypto");
// node.js'in içerisinde kendisi var. Öncelikle onu çağırıyoruz.

const keyCode = process.env?.SECRET_KEY || "write_random_chars_in_here";
// .env dosyasında bir keyCode oluşturuyoruz.

const loopCount = 10_000; // 10K
const charCount = 32; // write 32 for 64
const encType = "sha512";

module.exports passwordEncrypt = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};

console.log(passwordEncrypt);