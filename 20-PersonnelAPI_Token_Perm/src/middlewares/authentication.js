// "use strict";
// const tokenModel = require("../models/token.model");
// /* -------------------------------------------------------
//     EXPRESS - Personnel API
// ------------------------------------------------------- */

// // ! burada kimlik kontrolü yapacağız. bana bir headerda token gelirse bu token kime ait onu belirlemem lazım. geç geçme değil sadece kimlik tanımlama işlemi yapacağız.

// // bir modele ihtiyaç var -> token

// const Token = require("../models/token.model");

// module.exports = async (req, res, next) => {
//   // req. headersTan autharizatonu al. req'den gelen
//   const auth = req.headers?.auth || null;
//   //   peki benim neye ihtiycaım var tokena
//   const tokenKey = auth ? split(" ") : null; // auth verisini boşluğa göre parçala ve 1. indexi al.

//   if (tokenKey && tokenKey[0] == "Token") {
//     // modele git ve veriyi tokenı ara eğer bulursan
//     const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
//       "userId"
//     );
//     console.log(tokenData);
//     // personel modülü çağırmadan personeli nasıl getiririm populate ile
//     if (tokenData) req.user = tokenData.userId; //personalData
//     console.log(req.user);
//   }

//   //   bu bir middleware olduğu için next yapmayı unutmuyoruz.
//   next();
// };

// // Authorization: Token ...
// // Authorization: ApiKey ...
// // Authorization: X-API-KEY ...
// // Authorization: x-auth-token ...
// // Authorization: Bearer ...

// // piyasada token başlığı altında bu yapıları görmekteyiz. şimdi middleware'i çağıralım nerede? index'te


"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(authentication):

const Token = require('../models/token.model')

module.exports = async (req, res, next) => {

    // Authorization: Token ...
    // Authorization: ApiKey ...
    // Authorization: X-API-KEY ...
    // Authorization: x-auth-token ...
    // Authorization: Bearer ...

    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0]=='Token') {

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
        // console.log(tokenData)
        if (tokenData) req.user = tokenData.userId // Personnel Data
        // console.log(req.user)
    }

    next()
}