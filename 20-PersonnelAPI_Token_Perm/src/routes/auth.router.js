"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// // {
//     "username": "testF0",
//     "password": "1234"
// }
/* ------------------------------------------------------- */


const router = require('express').Router()
/* ------------------------------------------------------- */

const auth = require('../controllers/auth.controller')

// URL: /auth

// Login/logout:
router.post('/login', auth.login)
router.all('/logout', auth.logout)

/* ------------------------------------------------------- */
module.exports = router

// login ve logutu ayırdık bunu index.js'te tanıtmamızlazm