"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// !2 login logout ayrı klasörde olur onları da ayıralım

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  // LOGIN & LOGOUT

  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user) {
        // * SESSION
        // Set Session:
        // req.session = {
        //   id: user._id,
        //   password: user.password,
        // };
        // // Set Cookie:
        // if (req.body?.rememberMe) {
        //   req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        // }

        // kullanıcın verilerini bir sesiona değil bir tokena havale etmemiz lazım bunu nasıl yapacağız?

        // bir modele ihtiyaç var. personel modele

        // * SESSION

        // TOKEN
        // token daha önce oluşturulmuş mu bunu kontrol etmemiz lazım. Mcelikle bunun daha önceden bir tokenı var mı kontrol edeceğiz

        let tokenData = await Token.findOne({ userId: user._id });

        // eğer token yoksa oluştur - key yap onu al. burada benzersiz bir şey koymamız lazım.

        if (!tokenData) {
          // burdaki veriyi de şifreledik ki daha güvenli
          const tokenKey = passwordEncrypt(user._id + Date.now()); // benzersiz bir token adresi tanımladık.
          console.log(typeof tokenKey, tokenKey);
          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }

        res.status(200).send({
          error: false,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry username and password.");
    }
  },

  logout: async (req, res) => {
    // Set session to null:
    req.session = null;
    res.status(200).send({
      error: false,
      message: "Logout: Sessions Deleted.",
    });
  },
};
