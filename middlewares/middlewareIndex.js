const express = require('express');
const router = express.Router();
var middlewareBodyParser = require('./middlewareBodyParser');
var middlewareJWT = require("./middlewareJWT")

router.use('/', middlewareBodyParser);
// router.use('/', middlewareJWT)

module.exports = router;