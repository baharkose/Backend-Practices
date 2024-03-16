"use strict";
/* 
    Express.js Routing
*/

require("dotenv").config();

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hello");
  res.send();
});

// sonu ne olursa olsun
app.get(/abc$/, (req, res) => {
  res.send({ message: "get method called" });
});

//? parametre -> path:parametre

app.get("/:blodId", (req, res) => {
  res.send({
    params: req.params,
  });
});

app.get("/:blogId/location/:location", (req, res) => {
  res.send({
    params: req.params,
  });
});

app.listen(PORT, HOST, () => {
  console.log(`server is runned http://${HOST}:${PORT}`);
});
