const Razorpay = require('razorpay');
const shortid = require('shortid');
const catchAsync = require('../utils/catchAsync');

const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const getRazorpayOrderId = catchAsync(async (req, res) => {
  try {
    const payment_capture = 1;
    const { amount } = req.body;
    const currency = 'INR';

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture
    };

    const response = await razorpay.orders.create(options);

    res.status(201).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const getOrderDetails = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .lean()
      .populate({ path: 'items.productId', select: 'image brand name' })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const createNewOrder = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const orderDetails = req.body;

    const newOrder = new Order({ ...orderDetails, userId });
    await newOrder.save();
    const cart = await Cart.findOne({ userId });

    cart.products = cart.products.filter(
      (item) =>
        !orderDetails.items.find((order) => {
          return order.productId.toString() === item.productId.id.toString();
        })
    );
    await cart.save();

    res.status(201).json(newOrder._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = { getOrderDetails, createNewOrder, getRazorpayOrderId };
