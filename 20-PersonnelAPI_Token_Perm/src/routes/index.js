"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const router = require("express").Router();

// ! ana routerlarımızı ayrı bir dosya içerisine taşıma işlemi
// routeları ayrı dosyaya taşımak için yine router kullnammaız lazım.
// routerda bir app amacı route yapmak olan app

// /departments
// app.use("/departments", require("./src/routes/department.router"));
// // /personnels
// app.use("/personnels", require("./src/routes/personnel.router"));

// ! hiyerarşik sıralama
// auth -> çoğul olmaz
router.use("/auth", require("./auth.router"));
// /token:
router.use("/tokens", require("./token.router"));
// department:
router.use("/departments", require("./department.router"));
// /personnel:
router.use("/personnels", require("./personnel.router"));

module.exports = router;
