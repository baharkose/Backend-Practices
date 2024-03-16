"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */

//* ERROR HANDLER

// app.get("/*", (req, res) => {
//   res.errorStatusCode = 404;

//   throw new Error("Error Message");
// });

//? errorHandler is middleware and has must be four parameters. (error, request, response, next)
// fonksiyon ismi gerekmiyor tek fonksiyon olduğu için
module.exports = (err, req, res, next) => {
  console.log("errorHandler started.", { cause: "no reason" });
  console.log(err);

  const errorStatusCode = res?.errorStatusCode || 500;

  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
    // terminale yazması beklenen hata mesajını da görebiliyoruz.
  });
};
//? for run errorHandler call in use.
//? It must be at last middleware.
//   buna ihtiyaç yok.
//   app.use(errorHandler);
