const express = require('express');
const controller = require('../controllers/controllerUM');
const router = express.Router();

router.post(`/login`, controller.login);
// router.get(`/logout`, controller.logout);
module.exports = router;