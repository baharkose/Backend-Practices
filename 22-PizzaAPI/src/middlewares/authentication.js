"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorizaton; // gelen veri Token ...tokenKey..
  // gelen veriye ulaşmak için
  const tokenKey = auth ? auth.split(" ") : null;
  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      //   gelen token tokenModelinde var mı eğer varsa ordaki userIdnin user bilgilerini getir bana
      //   bu populate gidecek userIdye bakacak ordan gelen datayı da bana göstericek
      // her yerden erişebilir yapamak için req.user dedik
      req.user = -tokenData ? tokenData.userId : undefined;
      //   dbde data varsa onu al. req usera ata onu, eğer yoksa onu undefined yap

    }
  }
  next()
};
