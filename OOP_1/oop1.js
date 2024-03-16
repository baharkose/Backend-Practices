"use strict";
// OBJECT

// direk obje tanımlada PascalCase yada camelCase kullanabiliriz. Pythonda pep8 vardır. Yani kod yazma standartları.
// const ExampleObject = {
//   propertyName: "value",
//   methodName: function () {
//     return "this is a method";
//   },

//   methodAlternative(){
//     return 'this is a method'
//   }
// };

// // bir propertyi çağırmak için
// console.log(ExampleObject.propertyName)
// //  metod çağırırken parantez kullanmayı unutmuyoruz.
// console.log(ExampleObject.methodName())

// const Car = {
//     brand: 'Ford',
//     model: 'Mustang',
//     year: 1967,
//     isAutoGear: true,
//     colors: ['white', 'red'],
//     details:{
//         color1: 'white',
//         color2:'red',
//         engineSize:4900
//     },
//     startEngine: function(){
//         return 'Engenine runned'
//     }
// }

// // normal şartlarda obje deyince bir classtan tanımlanış olamasını bekleriz. Propertyler ile string, dizi, başka bir obje dahi nested yapılar dahi tanımlayabiliriz. Aynı zamanda fonksiyonlarda tanımlayabilirz.

// console.log(Car.brand)
// console.log(Car.colors)
// console.log(Car.colors[0])
// console.log(Car.details)
// console.log(Car.details.color1)
// console.log(Car.startEngine())
// // alternatif obje içerisinden çağırma yöntemi
// console.log(Car['brand'])
// console.log(Car['colors'][0])
// // içerideki elemanlara ulaşmak için köseli parantez ekleyerek devam edebiliriz.
// console.log(Car['details']['engineSize'])
// // metod çağıralım ***
// console.log(Car['startEngine'](0))
// //
// ? This KEYWORD
const Car = {
  brand: "Ford",
  model: "Mustang",
  year: 1967,
  isAutoGear: true,
  colors: ["white", "red"],
  details: {
    color1: "white",
    color2: "red",
    engineSize: 4900,
  },
  startEngine: function () {
    return "Engine runned";
  },
  getDetails: function () {
    // return true;
    //  this parametresi ile objenin içerisindeki bir metodta içinde bulunduğum objenin diğer elementlerine erişebilirim.
    // return this.brand + ' ' + this.model + ' ' + this.year
    return this.startEngine()
  },
//    arrow funcitonda işler değişir ve bize boş bir obje döndürür. Arrow funtion kapsama falan dinlemez. En tepedeki scopeu alıyoda diyemiyoruz. Çünkü burada scope da yok.
  arrowMethod: () => {
    // return this
    return Car.brand
  }
};
console.log(Car.getDetails())
console.log(Car.arrowMethod())
//  arrow'a classlarda ihtiyacımız vardır. Her şeye erişen bir fonksiyona ihtiyaç duyuyorsak o zaman arrow function kullanmalıyız. 

// ? ARRAY DESTR.

const testArray = ['value0', 'value1', 'value2', 'value3', 'value4']

// ben istiyorum ki arraydeki herbir elemanı dışarıya aktarmak istiyorum
const [var0, var1, var2, ...var9] = testArray
console.log(object)

// ? Spread Operatörü

const newObj={
  ...Car,
  newKey: 'new-vlaue'
}

console.log(newObj)
// rest APi = json api

//? Object to JSON

const json = JSON.stringify(Car)
console.log(json, typeof json)

//? JSON TO OBJ

const obj = JSON.parse(json)
console.log(obj, typeof obj)
