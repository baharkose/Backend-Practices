"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");
// + 4
const permissions = require("../middlewares/permission");
// + soru? departmanları listele-> departmentları kimler görüntüleyebilir?
// + login olan herkes. routten hemen önce middleware yazabilirim

// URL: /departments

router
  .route("/")
  // + route a göre kontrol mekanizması sağlamak için routetan hemen sonra middleware ekleyebilirim.
  .get(permissions.isLogin && department.list)
  //+ createdepartment only admin
  .post(permissions.isAdmin && department.create);

router
  .route("/:id")
  //   + burda sadece departman ismi görüntüleniyor.
  .get(permissions.isLogin && department.read)
  //   + kim update, delete edebilir admin
  .put(permissions.isAdmin && department.update)
  .patch(permissions.isAdmin && department.update)
  .delete(permissions.isAdmin && department.delete);
// + sadece bu detayları admin ya da lead görebilir
router.get("/:id/personnels", permissions.isAdminOrLead && department.personnels);

/* ------------------------------------------------------- */
module.exports = router;
