const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
  getProducts,
  createNewProduct,
  getProductById
} = require('../controllers/productController');

router.route('/').get(getProducts).post(isAuth, createNewProduct);

router.route('/:id').get(getProductById);

module.exports = router;
