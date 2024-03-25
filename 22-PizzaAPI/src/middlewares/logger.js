"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i morgan
// app.use(logger):

const morgan = require("morgan");
// günlük log kayıtlarını tutmak için
const fs = require("node:fs");

const now = new Date();
// gün gün tutmak için
const today = now.toISOString().split("T")[0];

module.exports = morgan("combined", {
  // nereye kaydolacak, hem yaz hem oku
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
