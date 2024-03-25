"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')
// mongoose kullandık. ORM yapısı mongodb için bize orm ve model imkanı verir

const dbConnection = function() {
    // db bağlantı komutları bir func atandı
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

// mongoose ve func connect yapıldı şuan bağlanmadı ne zaman çalışır. indexte çağırınca 31. str
/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 