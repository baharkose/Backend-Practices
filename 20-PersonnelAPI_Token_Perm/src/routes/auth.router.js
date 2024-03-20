"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");

// URL: /auth

// Login/logout:
router.post("/login", personnel.login);
router.all("/logout", personnel.logout);

/* ------------------------------------------------------- */
module.exports = router;


// login ve logutu ayırdık bunu index.js'te tanıtmamızlazm