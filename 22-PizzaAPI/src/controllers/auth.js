"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */
    //  ! kullanıcı giriş yaparken isterse username passpwrd veya email password ile giriş yapabilir.
    // bunlar bana nerden req.bodyden
    const { username, email, password } = req.body;
    if ((username || email) && password) {
      // mongoda or ${}, array içinde obje açacağız. username veya email varsa
      const user = await User.findOne({
        $or: [{ username: username }, { email }],
      });
      //   burada user şifrelenmiş hali
      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        } else {
          // SIMPLE TOKEN
          // bu arkadaş daha önce bir token aldı mı
          // mongoda idyi çağırırken _id ile ya da _ olmadanda kullanabiliriz.
          let tokenData = await Token.findOne({ userId: user.id });
          if (!tokenData) {
            // tokenı yoksa bir tane token oluştur
            tokenData = await Token.create({
              userId: user.id,
              // şuanki zamanı saniye cinsinden al
              token: passowrdEncrypt(user.id + Data.now()),
            });
          }
        }
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },
  logout: async (req, res) => {},
};
