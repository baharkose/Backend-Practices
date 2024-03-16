"use strict";

/* --------------------------- OOP & CLASSES ---------------------------- */

// class declaration
// class PascalCaseName {...}

// class expression
const PascalCaseClassName = class {
  // bir classın içerisindeki değişkene property denir

  undefinedProperty; // only definition
  propertyName = "value"; // attribute, field

  // new Class ile obje oluştururken parametre göndermek için constructor isminde bir method kullanırız. constructor açılışta otomatik olarak çalışan. diğerlerinden farkı otomatik olarak başlangıçta bir kereye mahsus çalışır.

  constructor(parameter1, parameter2 = "default-value") {
    this.parameter1 = parameter1;
    this.parameter2 = parameter2;
  }

  methodNAme1() {
    return this
  }
};

// bu artık bir instance diğerlerinden farkı ne classtan üretilmiş bir obje

const PascalCaseInstanceName = new PascalCaseClassName(0, 1);
console.log(PascalCaseClassName);
console.log(typeof PascalCaseClassName)
console.log("deneme")

class Car {
    isRunning = false

    constructor (brand, model, year){
        this.brand = brand
        this.model = model
        this.year = year
    }

    
    runEngine() {
        this.isRunning = true
        console.log('Engine runned')
        return this.isRunning
    }
}

const Ford = new Car('Ford', 'Mustang', 1967)
// console.log(Ford)
// Ford.isRunning = true

Ford.runEngine()
console.log(Ford)


