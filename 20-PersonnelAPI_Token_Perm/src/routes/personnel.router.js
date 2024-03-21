"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");
const permissions = require("../middlewares/permission");

// URL: /personnels

// // Login/logout:
// router.post('/login', personnel.login)
// router.all('/logout', personnel.logout)

router.route("/").get(personnel.list).post(personnel.create);

router
  .route("/:id")
  // + burayı açıkla
  .get(permissions.isAdminOrOwn, personnel.read)
  .put(permissions.isAdminOrOwn, personnel.update)
  .patch(permissions.isAdminOrOwn, personnel.update)
  .delete(permissions.isAdmin, personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;

// + token routera
