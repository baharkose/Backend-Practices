"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors");

const User = require("../models/user.model");

const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await User.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  // ! 1
  login: async (req, res) => {
    // kullanıcı bana email password göndeircek ben kontrol edicem dbde bçyle biri var mı varsa onu kabul edip kaydedicem. login olduğumu hatırlamak için onu cookieye kaydedicem. -> user.routera - öncelikle req bodyden email ve passwordu al sonra kontrol et. bilgiler geldi mi gelmedi ise hata verdir. Geldi ise bu kullanıcıyı user modelinde findOne yap. Bu arada unutma dbdeki password şifreli. Peki kullanıcı bu adama paraolayı nasıl göndericek?

    // ! - dbdeki sifreli string ile kullanıcın bana gönderdiği şifrenin şifrenin şifrelenmiş hali eşit mi?

    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email:email });
      // kısayol
      const user = await User.findOne({ email });

      // eğer böyle bir kullanıcı varsa, bizim ne yapmamız lazım bu passwordu de şifrelememiz lazım. Yukarı çıktık. Şifrelenmiş halleri birbirine eşit mi diye sorabiliriz. secret key değiştirirsek can simidi verileri sıfırlar. Cookiler vsç her şey ne olur iptal. Aşırı kritik durumlarda bu yapılabilir.

      // ! çok acil durumlar için kullanılabilir. Yoksa projede çöp olur.

      if (user && user.password == passwordEncrypt(password)) {
        // !COOKIES - veri kaydı -> indekse ışınlan
        // req.session benim obje kaydedip okuabileceğim yer. çok kolay veri kaydı
        // req.session = {
        //   email: user.email,
        //   password: user.password,
        // };
        req.session.email = user.email;
        req.session.password = user.password;
        // ? veri kaydetme bu kadar basit bir işlem
      } else {
        res.errorStatusCode = 401;
        throw new Error("login parameters are not true");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("email and password required");
    }
  },
  logout: async (req, res) => {},
};
