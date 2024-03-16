"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BUILTIN MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */

// req.boy ile gönderilmiş bir veriyi alabiliyoruz.

app.all("/*", (req, res) => {
  res.send({
    body: req.body,
    message: "hello",
  });
});
// * data receiving
// sevgili express ben json veriyi alıcam haberin olsun. veriyi kabul et ve json yap.
// tek satırlık middleware'i projenin başına eklersem artık bu çalışır demek.
app.use(express.json());

// text almak içinse express.text()

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
