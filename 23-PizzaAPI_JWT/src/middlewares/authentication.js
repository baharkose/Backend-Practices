// "use strict";
// /* -------------------------------------------------------
//     NODEJS EXPRESS | CLARUSWAY FullStack Team
// ------------------------------------------------------- */

// const Token = require("../models/token");
// // öncelikle jwtyi çağırdık. Şimdi tokenı doğrulayacağız. Bunu accesstoken imzası ile çözebiliyor muyuz ona bakacağız.
// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   const auth = req.headers?.authorization; // Token ...tokenKey...
//   const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

//   if (tokenKey) {
//     if (tokenKey[0] == "Token") {
//       // Simple Token

//       const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
//         "userId"
//       );
//       req.user = tokenData ? tokenData.userId : false;
//     } else if (tokenKey[0] == "Bearer") {
//       // JWT AccessToken
//       //   jwt.verify(accessToken, access_key)
//       // bu veriyi bu accesskey ile çöz. çözdükten sonra ya error verir ya da datayı vericek
//     //   
//     jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function(error, accessData) {

//         // if (accessData) {
//         //     console.log('JWT Verify: YES')
//         //     req.user = accessData
//         // } else {
//         //     console.log('JWT Verify: NO')
//         //     req.user = false
//         // }
//         req.user = accessData ? accessData : false
//     })

//     }
//   }
//   next();
// };

// // buranın amacı tokenı kontrol etmek.


"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require('../models/token')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey) {

        if (tokenKey[0] == 'Token') {
        // SimpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : false

        } else if (tokenKey[0] == 'Bearer') {
        // JWT AccessToken:

            // jwt.verify(accessToken, access_key, callbackFunction())
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function(error, accessData) {

                // if (accessData) {
                //     console.log('JWT Verify: YES')
                //     req.user = accessData
                // } else {
                //     console.log('JWT Verify: NO')
                //     req.user = false
                // }
                req.user = accessData ? accessData : false
            })
        }
    }
    next()
}


// iki parametreli yaparsak senkron, üç parametreli olursa asenktron olur. aynı isimdeki bir metodu farklı parametrelerle kullanmak neyin örneği, ovrloading örneği