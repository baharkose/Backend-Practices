"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */
const router = require("express").Router();

const User = require("../controllers/user.controller");

// User:
router.route("/").get(User.list).post(User.create);
router
  .route("/:userId")
  .get(User.read)
  .put(User.update) // put patch aynı
  .patch(User.update)
  .delete(User.delete);
// ! 2 routera controllerımızı tanıttık.
  router.post("/login", User.login);
// logoutta  veri gönderimi olmadığı için o nedenle get yaptık. Data gönderimi yok. Aynı zamanda güvenliği önemsiz işlemler için kullanılır.All da diyebiliriz gette diyebiliriz.
router.get("logout", User.logout);

module.exports = router;
