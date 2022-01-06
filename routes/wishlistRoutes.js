const express = require('express');
const router = express.Router();

const {
  getOrCreateWishlist,
  populateWishlist,
  addOrUpdateProductInWishlist
} = require('../controllers/wishlistController');
const isAuth = require('../middleware/isAuth');

router.use(isAuth);
router.use(getOrCreateWishlist);

router.route('/').get(populateWishlist).post(addOrUpdateProductInWishlist);

module.exports = router;
