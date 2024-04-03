"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// passwordEncrypt(password:string):

// 1- kime- konu -içerik

const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
  // Connect to MailServer:
  // const transporter = nodemailer.createTransport({
  //     // SMTP:
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false, // ssl, tls
  //     auth: {
  //         user: 'sfystdx7sif4vdr3@ethereal.email',
  //         pass: '9NQJqyC9TYYrh5Yqpj'
  //     }
  // })
  // console.log(transporter)

  // SendMail:
  // transporter.sendMail({
  //     from: 'sfystdx7sif4vdr3@ethereal.email',
  //     to: 'qadir@clarusway.com', // 'a@b.com, c@d.com'
  //     subject: 'Hello',
  //     text: 'Hello There. How are you?',
  //     html: '<b>Hello There.</b> <p>How are you?</p>',
  // }, (error, success) => {
  //     success ? console.log('SUCCESS', success) : console.log('ERROR', error)
  // })

  //* GoogleMail (gmail)
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "qadiradamson@gmail.com",
      pass: "glco ruhh szks rcsb",
    },
  });

  // //? YandexMail (yandex):
  // const transporter = nodemailer.createTransport({
  //     service: 'Yandex',
  //     auth: {
  //         user: 'username@yandex.com',
  //         pass: 'password' // your emailPassword
  //     }
  // })

  transporter.sendMail(
    {
      // from: 'qadiradamson@gmail.com',
      //   fonksiyondan gelen parametreleri yazdık
      to: to,
      subject: subject,
      text: message,
      html: message,
    },
    (error, success) => console.log(success, error)
  );

  /* ------------------------------------------------------- */
};
