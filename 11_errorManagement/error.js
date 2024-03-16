"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *

app.get('/', (req, res) => {
    throw new Error('Error Message')
})

app.get('/user/:id', (req, res) => {

    const id = req.params?.id || 0

    try {
        if (isNaN(id)) {

            throw new Error('ID is not a number')

        } else {

            res.send({
                message: 'OK',
                id
            })
        }

    } catch (err) {

        res.send({
            error: true,
            message: err.message
        })
    }

})

/* ------------------------------------------------------- 

const asyncFunction = async () => {
  throw new Error("Error Message");
};
// asenkron fonksiyonu nasıl error handlera havale ederiz.

//? control with catch



/* ------------------------------------------------------- */

//? express error handling
// npm i express-async-errors
// bu modül asenkron fonksiyonlarda oluşan hataları otomatik olarak error handlinge yönlendirir.

// herhangi bir middleware içerisinde oluşan hataları error handler yakaları. Ama askenron ise express-async-errors modülünü kullanmamız yeterli. Artık bu

require("express-async-errors");

app.get("/async", async (req, res, next) => {
  await asyncFunction().then().catch(next);
});

// error status kod belirle ve bir hata fırlat. Kural bu

//* ERROR HANDLER

// app.get("/*", (req, res) => {
//   res.errorStatusCode = 404;

//   throw new Error("Error Message");
// });

//? errorHandler is middleware and has must be four parameters. (error, request, response, next)
// const errorHandler = (err, req, res, next) => {
//   console.log("errorHandler started.", { cause: "no reason" });
//   console.log(err);

//   const errorStatusCode = res?.errorStatusCode || 500;

//   res.status(errorStatusCode).send({
//     error: true,
//     message: err.message,
//     cause: err.cause,
//     stack: err.stack,
//     // terminale yazması beklenen hata mesajını da görebiliyoruz.
//   });
// };
// //? for run errorHandler call in use.
// //? It must be at last middleware.
// app.use(errorHandler);

//!error handler modülü

app.use(require("./errorHandler"));

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
