const express = require('express');
const controller = require('../controllers/controllerUM');
const router = express.Router();

router.post(`/login`, controller.login);
router.post(`/signup`, controller.signup);
router.get(`/getforUserModal`, controller.getfor_user_modal);
router.post(`/getforTableBalance`, controller.getfor_table_balance);
router.post(`/getuserbymnemonic`, controller.get_user_account);

module.exports = router;