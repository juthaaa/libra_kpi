const express = require('express');
const router = express.Router();
const routeUM = require('./routeUM');

router.use(`/um`,routeUM );



router.use(`/`, (req, res) => res.send('Welcome libra_kpi Project'));


module.exports = router;