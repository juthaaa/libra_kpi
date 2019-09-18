const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const router = express.Router();

morgan.token('date', (req, res, tz) => {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSS Z');
})

morgan.format('myformat', ':date :remote-addr :method :url :status :res[content-length] - :response-time ms');
router.use(morgan('myformat'));

module.exports = router;