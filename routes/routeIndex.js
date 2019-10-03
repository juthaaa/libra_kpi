const express = require('express');
const router = express.Router();
const routeUM = require('./routeUM');
const routeLibraserv = require('./routeLibra')

router.use(`/um`,routeUM);
router.use(`/libraserv`,routeLibraserv)

router.use(`/`, (req, res) => res.send('Welcome libra_kpi Project'));

module.exports = router;