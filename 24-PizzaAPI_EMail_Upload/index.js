"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm i jsonwebtoken
    $ nodemon
    $ npm i nodemailer multer


https://www.nodemailer.com/

https://www.npmjs.com/package/nodemailer
https://ethereal.email/

fake mail servisi arkasında gerçek bir mail servisi yok


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

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logger:
app.use(require("./src/middlewares/logger"));

// Auhentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

// Email
// {
//     user: 'jmzhbr3hulxhreib@ethereal.email',
//     pass: 'Ep7X5PTuzxjV4qQrPt',
//     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//     web: 'https://ethereal.email'
//   }

const nodemailer = require("nodemailer");
// create test(fake) account
// bize test account bilgileri verir

// bize fake bir mail oluşturdu
//1 nodemailer.createTestAccount().then((data)=>console.log(data))

// mail serverlar çift hizmete sahiptir. mail gönderme ve alma ayrı ayrı hizmetlerdir. mail gönderme protokolü smpt -a lan ise imap ve pop3 protokülüdür

// şimdi biz mail gönderme yapıcaz yanı smpt protokülünü kullanacağız
// o nedenle mail göndericeksem spmt verilerine ihtiyacım var.

// 2
// önce mail serverına bağlan ve bana bu maili gönder
// const transporter = nodemailer.createTransport({
//   // mail gönderirken smtp
//   //SMTP

//   host: "smtp.ethereal.email", // mail göndeirlecek host
//   port: 587,
//   secure: false, //ssl,tls
//   auth: {
//     user: "jmzhbr3hulxhreib@ethereal.email",
//     pass: "Ep7X5PTuzxjV4qQrPt",
//   },
// });
// console.log(transporter);

/* ------------------------------------------------------- */

// Routes:

// routes/index.js:
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// // mail göndermek için sendMail
// transporter.sendMail({
//   from: "jmzhbr3hulxhreib@ethereal.email",
//   to: "baharkse17@gmail.com",
//   subject: "Hello",
//   //   iki tane yöntem var. text ve html yöntemi
//   text: "hello bahar ",
//   html: "<b>hello there</b><p>How are you?</p>",
// },
// // ikici parametre, gönderme işlemi başarılı ise success başarısız ise error
// (error, success))=>{
//     success ? console.log("SUCCESS", success):console.log("ERROR", error)
// });

// SendMail:
// transporter.sendMail(
//   {
//     from: "jmzhbr3hulxhreib@ethereal.email",
//     to: "baharkse17@gmail.com",
//     subject: "Hello",
//     text: "Hello There. How are you?",
//     html: "<b>Hello There.</b> <p>How are you?</p>",
//   },
//   (error, success) => {
//     success ? console.log("SUCCESS", success) : console.log("ERROR", error);
//   }
// );

// 250 mail gönderildi kodu

// * googleMail (gmail)
// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords

// transporter ve senMaili yoruma aldık
// gmail servisinde uzun uzun yazmaya gerek yok. ben zaten gmaili tanıuotum yaparım. ahngi servis olucak hail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baharkse17@gmail.com",
    // password bizim mail passwordumuz değil o zmaan ne
    pass: "", // buraya uygulama şifrelerine tıklayarak gelen şifreyi giriyoruz.
  },
});

transporter.sendMail({}, (err, success) => console.log(success, err));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
