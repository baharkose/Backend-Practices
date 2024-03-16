"use strict";
// her dosya oluşturduğumuzda projemize use strict demeyi unutmayalım.

// Node Modules

console.log("this line from modules");

//  js de bir dosyayı çağırma komutu require

// ? single funciton
// tek bir fonksiyonu export etme

// const testFunction = function(){
//     console.log("this is function")
// }
// module.exports=testFunction

//? alternatif yazma yöntemi
// ama bu tek bir fonksiyon için

// module.exports=function(){
//     console.log("this is a function")
// }

//? multi function

const testFunctionA = function () {
  console.log("this is function A");
};
const testFunctionB = function () {
  console.log("this is function B");
};
const testFunctionC = function () {
  console.log("this is function C");
};

// n adet fonksiyonun aktarılma işlemi

// module.exports=[
//     testFunctionA,
//     testFunctionB,
//     testFunctionC,
// ]

// obj
module.exports = {
  testFunctionA: testFunctionA,
  testFunctionB: testFunctionB,
  testFunctionC: testFunctionC,
};
