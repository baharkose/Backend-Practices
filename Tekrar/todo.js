"use strict";

// EXPRESSJS - Todo Project with sequelize

const express = require("express");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

require("express-async-errors");
app.all("/", (req, res) => {
  res.send("welcome to todo api");
});

// öncelikle kullanılcak olan yapılar alındı.
const { Sequelize, DataTypes } = require("sequelize");

// veri gönderimini json ile yapıyoruz. bunu yapmazsak veri gönderilmez.

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode || 500;
  console.log("error handler worked");

  res.status(errorStatusCode).send({
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    stack: err.stack, // error details
  });
};

// sqlize 'ı biz model ve orm yapısı için kullanıyoruz. Data alışverişini ise obje mantığı ile gerçekleştirmiş olacağız.

app.use(errorHandler);
// veri gönderimi için bunu yapıyoruz.
// ! burası ne işe yarıyor?
/* 
    middleware arakatman olarak JSON tipindeki gelen istek gövdelerinin ayrıştırılmasını sağlar. Bu sayede HTTP isteklerinin gövdesinde JSON formatında gönderilen veriler, doğrudan Javascript nesnelerine dönüştürülür.

    app.use(express.json())
    Express.js uygulamamızın JSON formatındaki gelen istek gövdelerini otomatik olarak ayrıştırıp, bu verileri işleyebilmemiz için gerekli yapılandırmayı etkinleştirir.Bu, REST API'ler ve web servisleri geliştirken oldukça yaygın bir ihtiyaçtır.

*/
app.use(express.json());
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
