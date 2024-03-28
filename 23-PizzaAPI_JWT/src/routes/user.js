"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/user:

const user = require("../controllers/user");
const permissions = require("../middlewares/permissions");
// herkes userCreate yapabilir o nedenle bişey yazmaya gerek yok.

// URL: /users

router.route("/").get(permissions.isAdmin, user.list).post(user.create);

router
  .route("/:id")
  .get(permissions.isLogin, user.read)
  .put(permissions.isLogin, user.update)
  .patch(permissions.isLogin, user.update)
  .delete(permissions.isAdmin, user.delete);

//   burdan toppinge
/* ------------------------------------------------------- */
module.exports = router;
