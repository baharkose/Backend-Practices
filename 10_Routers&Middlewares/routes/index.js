"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ROUTING
------------------------------------------------------- */

/* express.Router() */
// const express = require('express')
// const router = express.Router()

const router = require('express').Router()

// router.get('/', (req, res) => res.send({ message: "Home Area" }))
// router.get('/about', (req, res) => res.send({ message: "About Area" }))
// router.get('/user/:id', (req, res) => res.send({ message: req.params.id }))

const { middleFunc1, middleFunc2 } = require('../middlewares/')

router.use(middleFunc1, middleFunc2)

//? router.route()
router.route('/')
    // .get(middleFunc1, middleFunc2, (req, res) => res.send(' message: "get"'))
    .get((req, res) => res.send(' message: "get"'))
    .post((req, res) => res.send({ message: "post" }))
    .put((req, res) => res.send({ message: "put" }))
    .delete((req, res) => res.send({ message: "delete" }))


module.exports = router
