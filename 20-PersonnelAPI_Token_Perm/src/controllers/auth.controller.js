"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// !2 login logout ayrı klasörde olur onları da ayıralım

// + Dikkat: req.body ile bana bir username ve password gelicek. Bununla kullanıcı sisteme dahil olmaya çalışıcak. Post -> login -> body
// + ben de bunun bilgilerini findOne yapıp arıyorum.

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  // LOGIN & LOGOUT

  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      // + burada encyrpt yapılmama nedeni modelde set işlemi ile encrypt yapmış olmamız. set metodu filtreleme işleminde de çalışır.
      if (user && user.isActive) {
        // user ban yemiş olabilir. aktif değilse zaten token alamaz.
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
          //   tokenı oluşturduk artık bunu frontEnde gönderebiliriz.
          console.log(typeof tokenKey, tokenKey);
          //   await create kisminda ise normalde req.body objesi giderken kendimiz modeldeki verileri verdik ona gore token data kurduk

          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }

        res.status(200).send({
          error: false,
          token: tokenData.token,
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
    // token silme işlemi
    // Set session to null:
    req.session = null;
    // SESSION

    // TOKEN

    // logoutta token olmaz zorunda
    // tek kullanıcı varsa
    // 1. Yöntem (Kısa yöntem):

    // console.log(req.user)
    // await Token.deleteOne({ userId: req.user._id })

    // 2. Yöntem:

    // her kullanıcı için birden fazla token varsa, çoklu cihaz
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0] == "Token") {
      await Token.deleteOne({ token: tokenKey[1] });
    }

    // bir kullanıcıya birden fazla token neden verme ihtiyacı hissederiz. Farklı cihazlar için olabilir. Pc'den girerken farklı, tabletten girerken. Bu nedenle ikinci yönteme alışmak daha mantıklı.

    res.status(200).send({
      error: false,
      message: "Logout: Sessions Deleted.",
    });
  },
};
