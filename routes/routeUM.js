const express = require('express');
const controller = require('../controllers/controllerUM');
const router = express.Router();

router.post(`/login`, controller.login);
router.post(`/signin`, controller.signin);
module.exports = router;