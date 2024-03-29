"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- *
//* MORGAN LOGGING
https://expressjs.com/en/resources/middleware/morgan.html
https://github.com/expressjs/morgan
? $ npm i morgan

const morgan = require('morgan')

// app.use(morgan('combined'))
// app.use(morgan('common'))
// app.use(morgan('dev'))
// app.use(morgan('short'))
// app.use(morgan('tiny'))
// app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent"'))

//? Write to log file:
// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a+' })
// }))

//? Write to file day by day:
const fs = require('node:fs')
const now = new Date()
// console.log(typeof now, now)
const today = now.toISOString().split('T')[0]
// console.log(typeof today, today)
app.use(morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}))

/* ------------------------------------------------------- */
//* DOCUMENTATION:
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express

// // * MORGAN
// const morgan = require("morgan");
// app.use(
//   morgan(
//     'IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent"'
//   )
// );

// ? write to log file
// const fs = require("node:fs");
// app.use(
//   morgan(
//     'IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent',
//     {
//       // ikinci parametrede log kayıtlarını bir dosyaya kaydet diyoruz.
//       // log kayıtları bir akıştır. fs modülünde akışı kaydeden modül createWriteStream'dir. Peki nereye bunu kaydedeceğiz İçinde bulunduğum klasörde access.log adındaki dosyaya bunu kaydet.

//       // + Flags → dosyaya yazma işlemi nasıl yapılacak. ÜStüne mi ekleyecek en baştan mı yazacak vs. vs. a+, aç hem okuma hem yazma için ve üzerine ekle eskisini silme.
//       stream: fs.createWriteStream("./access.log", { flags: "a+" }),
//     }
//   )
// );

// ? write to file day by day
// yine bunun için fs modülüne ihtiyacımız var.

// const fs = require("node:fs");
// // gün gün tutacağımız için güne de ihtiyacımız var.
// const now = new Date();
// console.log(now);
// // 2024-03-24T12:24:39.806Z
// // gelen şuanki zaman formatını split ile parçalayıp bugünü aldık.
// const today = now.toISOString().split("T")[0];
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
//   })
// );

// //? JSON
// app.use("/documents/json", (req, res) => {
//   res.sendFile("swagger.json", { root: "." });
// });

//* DOCUMENTATION:
// https://swagger-autogen.github.io/docs/
// + otomatik swagger dosyası oluşturur bizim için. işi json dosyası oluşturmak.
// $ npm i swagger-autogen
//+ json dosyasını alıp görüntüleme işlemi yapar. Görsele dönüştürme işlemi
// $ npm i swagger-ui-express
// $ npm i redoc-express

// //? SWAGGER:
// const swaggerUi = require("swagger-ui-express");
// const swaggerJson = require("./swagger.json");
// app.use(
//   "/documents/swagger",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerJson, {
//     swaggerOptions: { persistAuthorization: true },
//   })
// );



// ? SWAGGER
const swaggerUi = require("swagger-ui-express");
// hangi urlde sistemi çalıştırmak istiyorsak onu yazıyoruzx ve içierisine de setup ile ayarlamaları yapıyoruz. Birinci parametre hangi json dosyası alıcak. şu urlde swagger yayını yap. serve sistemi çalıştır. ayarlar için setupta bir obje açıyoruz. ilk parametre json soyası nerde, ikinci ise token moken vs. çalışması için

const swagger = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  //   swaggerUi.setup("./swagger.json", {
  // buraya bunu bu şekilde yazmak yetmiyor onu require etmemiz lazım
  swaggerUi.setup(swagger, {
    swaggerOptions: { persistAuthorization: true },
  })
);

//? JSON
// ? JSONI EKRANA BASMA
// JSON dosyasını urlde göstermek istiyorum…
// documents/son urlsinde bir dosya içiriğini gösterme işlemi
app.use("/documents/json", (req, res) => {
    // res.sendFile yaptığımız zaman bir dosya içeriğini ekrana basabiliyoruz.
    // ilk parametre göndereceğimiz dosya adı, root nerden alacağız biz bu dosyayı. . içinde bulunduğun klasörde ara
    res.sendFile("./swagger.JSON", { root: "." });
  });

//? REDOC
const redoc = require("redoc-express");
// app.use deyip aynı mantık url yazıyoruz. ama bi kaç ayarlaması var.
app.use("/documents/redoc",redoc({
    title:"PERSONNELAPI",
    // redoc bu datayo nerden alıcak az önce ekrana bastığımız yerden alıcak o yüzden spaca url kısmına swagger kullanarak ekrana bastığımız urli yazıyoruz.
    specUrl:"/documents/json"

}))

// // ? REDOC
// const redoc = require("redoc-express");
// app.use(
//   "/documents/redoc",
//   redoc({
//     title: "PersonnelAPI",
//     specUrl: "/documents/json",
//   })
// );

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logging:
app.use(require("./src/middlewares/logging"));

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- *
// Authentication (SessionCookies):
// Login/Logout Control Middleware
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) {
        //     req.isLogin = true
        // }
        req.isLogin = user && user.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})

/* ------------------------------------------------------- */
// Authentication (Simpe Token):

app.use(require("./src/middlewares/authentication"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        // session: req.session,
        // isLogin: req.isLogin,
        user: req.user,
        api: {
            documents: {
                swagger: 'http://127.0.0.1:8000/documents/swagger',
                redoc: 'http://127.0.0.1:8000/documents/redoc',
                json: 'http://127.0.0.1:8000/documents/json',
            },
            contact: 'contact@clarusway.com'
        },
    })
})


// // /departments
// app.use('/departments', require('./src/routes/department.router'))
// // /personnels
// app.use('/personnels', require('./src/routes/personnel.router'))

// app.use(require('./src/routes/index'))
app.use(require("./src/routes/"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
