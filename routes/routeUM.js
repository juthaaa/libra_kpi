const express = require('express');
const controller = require('../controllers/controllerUM');
const router = express.Router();

router.post(`/login`, controller.login);
router.post(`/signin`, controller.signin);
router.get(`/getalluser`, controller.getUserAll);
router.post(`/getforDashboard`, controller.getforDashboard);
router.post(`/getbalance`,controller.getbalance_account)
module.exports = router;