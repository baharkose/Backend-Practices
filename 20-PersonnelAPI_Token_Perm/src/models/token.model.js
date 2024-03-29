"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// ! token oluşturmak için önce model oluşturmalıyız.
// ! 1 önce kullanıcı giriş yapıcak doğru ise onun için token oluşturucaz.

const { mongoose } = require("../configs/dbConnection");
// modülü tekrar tekrar çağırmamak için bu şekilde mongooseu çağııroruz.
//model iki adet fielddan oluşuyor.

/*------------------------------------------------------- *
// user Id ben userı saklayacağım, tokenda ise oluşturduğum token olacak.
{
  "userId": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */

// Token Model: hangi userın hangi tokena ait olduğunu bilebilmemiz lazım. fe benden bir iş talep ederken bana bir token göndermek zorunda kalsın ve ben bu tokendan ben userı tanıyacağım.

// her kullanıcın varlığını token ile anlayacağız bu yüzden hangi token hangi user onu bilmek istedik.

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      //   bu user modelinin objectIdsi
      ref: "Personnel",
      required: "true",
      index: "true",
      //   neden index true -> daha hızlı erişebilecek şekilde saklar. Ramden destek alır. Ram hdd'den daha hızlı. O da veriyi rame saklıyor ve daha hızlı bir erişim sağlıyor
      unique: true,
    },
    token: {
      type: String,
      //   string varsa genelde trimde var.
      trim: true,
      required: true,
      // özellikle index true çok önemli, özellikle SQL dblerde bu çok önemli
      index: true,
      unique: true,
    },
  },
  {
    // genellikle çoğul ve camelCase
    collection: "tokens",
    timestamps: true,
  }
);

// model ismi inctance , ilk harfleri de büyük PascalCase, controller camelCase. url'ler çoğul olur
module.exports = mongoose.model("Token", TokenSchema);
// şemamızı model haline döküyoruz. Şemayı token isminde bir modele çevir ve token şemayı çek.

// ! her kullanıcının varlığını token ile anlayacağız... normalde tokena controller yazmaya gerek yok. heyecan ..

// "use strict";
// /* -------------------------------------------------------
//     EXPRESS - Personnel API
// ------------------------------------------------------- */
// const { mongoose } = require('../configs/dbConnection')
// /* ------------------------------------------------------- *
// {
//     "userId": "65343222b67e9681f937f001",
//     "token": "...tokenKey..."
// }
// /* ------------------------------------------------------- */
// // Token Model:

// const TokenSchema = new mongoose.Schema({

//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Personnel', // 'User'
//         required: true,
//         index: true,
//         unique: true,
//     },

//     token: {
//         type: String,
//         trim: true,
//         required: true,
//         index: true,
//         unique: true,
//     },

// }, {
//     collection: 'tokens',
//     timestamps: true
// })

// /* ------------------------------------------------------- */
// module.exports = mongoose.model('Token', TokenSchema)
