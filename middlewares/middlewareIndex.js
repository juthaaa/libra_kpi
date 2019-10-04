const express = require('express');
const router = express.Router();
var middlewareBodyParser = require('./middlewareBodyParser');

router.use('/', middlewareBodyParser);

module.exports = router;