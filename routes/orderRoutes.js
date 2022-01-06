const express = require('express');
const {
  getOrderDetails,
  createNewOrder,
  getRazorpayOrderId
} = require('../controllers/orderController');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.use(isAuth);
router.route('/').get(getOrderDetails).post(createNewOrder);
router.route('/razorpay').post(getRazorpayOrderId);

module.exports = router;
