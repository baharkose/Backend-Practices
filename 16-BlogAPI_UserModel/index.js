"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */
/*
    BLOG API with Mongoose
*/
/*
    $ npm i express dotenv express-async-errors
    $ npm i mongoose
*/
const express = require("express");
const app = express();

app.use(express.json()); // yukarıda  kalsın

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* DB connection  */
require("./src/configs/dbConnection"); // dotenv çalıştıktan sonra

/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session
/* ------------------------------------------------------- */
// sessionları yönetmek için indirmemiz gerekir.Express.js tarafından belirtilen bir modüldür. Official modüldür. Modüllerin alternatifleri var daha kolay kullanıma sahip olanları. Piyasanın modülü

const session = require("cookie-session");
// kullanımı çok basit bir modül, aynı zamanda bir middleware. o nedenle app.use
// bazı verileri tarayıcı kendisi şifreliyor ama biz işimizi tarayıcıya bırakmayacağız ve işi kendimiz yapacağız. Şifrelenmiş olarak verilerimizi saklamış olacağız.

// !3
app.use(
  session({
    // session yaparken kullanmak istediğimiz ayarlar
    secret: process.env.SECRET_KEY, // şifreleme anahtarı, bizim zaten bir secret keyimiz vardır.
    maxAge: 1000, // milisn cinsinden. Örneğin kaydettiğimiz verilere 3 gün boyunca bu veriyi sakla demek istiyorsak 1000 ms 1 sn * 60 * 60 * 24 * 3 -> çarpa çarpa istediğimiz ömrü verebiliriz. Burda bir global bir ayar yaptık. Ben artık session kullanamam hepsi cookie oldu. Session olması için ömür biçilmemesi lazım. O nedenle onu yoruma alıyoruz.
    // sessionda bir cookie'dir.
    // cookie kulllanabilmemiz için temel giriş ayarlarımız. Peki bunu nasıl kaydedeip nasıl okuyacağız.  Controller- user controllera
  })
);

app.all("/", (req, res) => {
  //   res.send("WELCOME BLOG API PROJECT");
  // ! 4 şimdi anasayfadan da erişebilmemiz lazım
  res.send({
    error: false,
    message: "Welcome",
    loginedUser: req.session,
    // eğer login varsa bunu anasayfada da görmem lazım.
  });
});

app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router"));

app.use(require("./src/middlewares/errorHandler")); // aşağıda kalsın

app.listen(PORT, () =>
  console.log(` Server Running on http://${HOST}:${PORT}`)
);

// require('./src/sync')()
