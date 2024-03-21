"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const token = require("../controllers/token.controller");
const permissions = require("../middlewares/permission");

// tüm permissionları değil sadece isAdmini çağırmak için
const { isAdmin } = require("../middlewares/permission");
// URL: /tokens

// + tokenı kim görebilir sadece admin bunun daha kısa bir yolu var mı tüm route permission is admin verice<.
// + router.use tanımlamak

// router.use(permissions.isAdmin);
// + destr ile isAdmini alma işlemi
router.use(permissions.isAdmin);

// router
//   .route("/")
//   .get(permission.isAdmin && token.list)
//   .post(permission.isAdmin && token.create);

// router
//   .route("/:id")
//   .get(permission.isAdmin && token.read)
//   .put(permission.isAdmin && token.update)
//   .patch(permission.isAdmin && token.update)
//   .delete(permission.isAdmin && token.delete);
router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

/* ------------------------------------------------------- */
module.exports = router;
