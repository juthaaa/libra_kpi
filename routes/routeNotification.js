const express = require('express')
const controller = require('../controllers/controllerNoti')
const router = express.Router()

router.post(`/createpetition`, controller.create_petiton)
router.post(`/get_data_noti`, controller.get_for_table_noti)
router.get(`/get_data_dash`, controller.get_data_dashbord)
router.post(`/update_reader_noti`, controller.update_reader_noti)
router.post(`/update_user_status`,controller.update_user_status)
router.post(`/update_petiton_status`,controller.update_petiton_status)
router.post('/get_data_mytracsaction',controller.get_data_mytracsaction)

module.exports = router;