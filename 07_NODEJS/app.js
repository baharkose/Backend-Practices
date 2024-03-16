"use strict";

console.log("hello fs15");
console.log("hello fs15");

require("./modules/module.js");
// js uzantıya gerek yok

require("./modules/module");
//  index js'i çağırır.
require("./modules/");

//  fonksiyonu nasıl çağırmalıyoruz. Fonksiyonumuzu export etmemiz gerekir.

//? single function call
// export işleminden sonra bir değişlenin içerisine atıp alabiliriz.

const testSingleFunction = require("./modules/module");

// testSingleFunction();

//? multi function

// const [test1, test2, test3] = require("./modules/module.js")
// test1()
// test2()
// test3()

// module.exports.testFunctionA=function(){
//     console.log("this is function A");
// }
// module.exports.testFunctionB=function(){
//     console.log("this is function B");
// }
// module.exports.testFunctionC=function(){
//     console.log("this is function C");
// }

const {testFunctionA:test1, testFunctionB:test2, testFunctionC:test3} = require("./modules/module.js")
test1()
test2()
test3()

//  verdiğimiz keylerin aynı olması gerekir.

// eğer adres belirtmezsek nodemodules'e bakar.
// node deyip : yapınca built-in modüller karşımıza çıakr.
// önce proje klasörü sonra global ortamlara bakar.

require("http")
require('node:')
require('dotenv').config() // .env file içeriğini process.env ye aktarır
console.log(process.env.PORT)
console.log(process.env.HOST)