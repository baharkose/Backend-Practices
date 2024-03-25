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
              token: passwordEncrypt(user.id + Data.now()),
            });
            res.status(200).send({
              error: false,
              token: tokenData.token,
            });
          }
        }
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "simpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */

    const auth = req.headers?.authorization; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
    result = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
      result,
    });
  },
};
