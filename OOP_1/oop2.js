// const Car = {

//     brand: 'Ford',
//     model: 'Mustang',
//     year: 1967,
//     isAutoGear: true,
//     colors: ['white', 'red'],
//     details: {
//         color1: 'white',
//         color2: 'red',
//         engineSize: 4900
//     },
//     startEngine: function() {
//         return 'Engine Runned.'
//     }
// }

// // objenin hem key hem de valularını array içeriisnde array şeklinde verir.
// const arrEnt = Object.entries(Car)
// // Constructors

// const constructorFunciton = function () {
//     // bunu constructor yapabilmek için yapmamız gereken this'dir. Thisi yazmazsam bu fonksiyonun hiç bir farklı kalmaz. Thisi yazınca artık bu constructor'dur.
//     this.property = 'value';
// }

// ? NEW KEYWORD

const carConstructor = function () {
    // this objenin brandı brand ise parametre
    this.brand = brand
    this.model = model
    this.year = year
    
    this.startEngine = function (){
        console.log('Engine runned')
    }
}

const newCar = new carConstructor('Ford', 'Mustang', 1967)
