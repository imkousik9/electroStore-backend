const Wishlist = require('../models/wishlistModel');
const catchAsync = require('../utils/catchAsync');

const getOrCreateWishlist = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
      wishlist = await wishlist.save();
    }
    req.wishlist = wishlist;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const populateWishlist = catchAsync(async (req, res) => {
  try {
    const { wishlist } = req;

    const activeProductsInWishlist = wishlist.products.filter(
      (item) => item.active
    );
    res.status(200).json(activeProductsInWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const addOrUpdateProductInWishlist = catchAsync(async (req, res) => {
  try {
    const productUpdates = req.body;

    let { wishlist } = req;

    const isProductAlreadyAdded = wishlist.products.find((product) => {
      return product.productId.id === productUpdates._id;
    });

    // if product is already present in the wishlist then toggling the status of product
    if (isProductAlreadyAdded) {
      for (let product of wishlist.products) {
        if (productUpdates._id == product.productId.id) {
          product.active = !product.active;
        }
      }
    } else {
      wishlist.products.push({ productId: productUpdates._id, active: true });
    }

    const updatedWishlist = await wishlist.save();

    const activeProductsInWishlist = updatedWishlist.products.filter(
      (item) => item.active
    );

    res.status(200).json(activeProductsInWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = {
  getOrCreateWishlist,
  populateWishlist,
  addOrUpdateProductInWishlist
};
