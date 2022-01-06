const Cart = require('../models/cartModel');
const { extend } = require('lodash');
const catchAsync = require('../utils/catchAsync');

const getOrCreateCartOfUser = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
      cart = await cart.save();
    }
    req.cart = cart;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const populateCart = catchAsync(async (req, res) => {
  try {
    let { cart } = req;

    const activeProductsInCart = cart.products.filter((item) => item.active);

    res.status(200).json({
      products: activeProductsInCart,
      addressId: cart.addressId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const addOrUpdateProductInCart = catchAsync(async (req, res) => {
  try {
    const productUpdates = req.body;

    const { cart } = req;

    const isProductAlreadyAdded = cart.products.find((product) => {
      return product.productId.id === productUpdates._id;
    });
    // if product is already present in the cart then updating that particular product
    if (isProductAlreadyAdded) {
      cart.products = cart.products.map((product) =>
        productUpdates._id == product.productId.id
          ? extend(product, productUpdates)
          : product
      );
    } else {
      cart.products.push({
        productId: productUpdates._id,
        quantity: 1,
        active: true
      });
    }
    const updatedCart = await cart.save();

    const activeProductsInCart = updatedCart.products.filter(
      (item) => item.active
    );

    res.status(200).json({
      products: activeProductsInCart,
      addressId: cart.addressId
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const updateAddressIdInCart = catchAsync(async (req, res) => {
  try {
    addressId = req.body;
    let { cart } = req;
    cart.addressId = addressId._id;

    cart = await cart.save();

    const activeProductsInCart = cart.products.filter((item) => item.active);
    res.status(200).json({
      products: activeProductsInCart,
      addressId: cart.addressId
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = {
  getOrCreateCartOfUser,
  populateCart,
  addOrUpdateProductInCart,
  updateAddressIdInCart
};
