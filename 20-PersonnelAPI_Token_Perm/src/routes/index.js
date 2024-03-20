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

// departments
router.use("/departments", require("./src/routes/department.router"));
// personnels
router.use("/personnels", require("./src/routes/personnel.router"));
// tokens
router.use("/tokens", require("./src/routes/token.router"));

module.exports = router;
