const express = require('express');
const controller = require('../controllers/controllerService');
const router = express.Router();

router.post(`/transfer`, controller.transfer);
router.post(`/getbalance`,controller.getbalance_account);
module.exports = router;