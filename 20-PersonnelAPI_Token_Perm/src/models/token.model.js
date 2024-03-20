"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// ! 1 önce kullanıcı giriş yapıcak doğru ise onun için token oluşturucaz.

const { mongoose } = require("../configs/dbConnection");
// modülü tekrar tekrar çağırmamak için bu şekilde mongooseu çağııroruz.

/*------------------------------------------------------- *
// user Id ben userı saklayacağım, tokenda ise oluşturduğum token olacak.
{
  "userId": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */

// Token Model:

const TokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      //   bu user modelinin objectIdsi
      ref: "Personnel",
      required: "true",
      index: "true",
      //   neden index true -> daha hızlı erişebilecek şekilde saklar. Ramden destek alır. Ram hdd'den daha hızlı. O da veriyi rame saklıyor ve daha hızlı bir erişim sağlıyor
    },
    token: {
      type: String,
      tirm: true,
      required: true,
      // özellikle index true çok önemli, özellikle SQL dblerde bu çok önemli
      index: true,
      unique: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

// model ismi inctance , ilk harfleri de büyük PascalCase, controller camelCase
module.exports = mongoose.model("Token", TokenSchema);
