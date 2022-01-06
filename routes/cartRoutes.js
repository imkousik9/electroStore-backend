const express = require('express');
const router = express.Router();
const {
  getOrCreateCartOfUser,
  populateCart,
  addOrUpdateProductInCart,
  updateAddressIdInCart
} = require('../controllers/cartController');
const isAuth = require('../middleware/isAuth');

router.use(isAuth);
router.use(getOrCreateCartOfUser);
router.route('/').get(populateCart).post(addOrUpdateProductInCart);
router.route('/address').post(updateAddressIdInCart);

module.exports = router;
