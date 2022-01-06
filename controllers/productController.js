const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

const getProducts = catchAsync(async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const createNewProduct = catchAsync(async (req, res) => {
  try {
    const productData = req.body;
    const NewProduct = new Product(productData);
    const createdProduct = await NewProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const getProductById = catchAsync(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'No product found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = {
  getProducts,
  createNewProduct,
  getProductById
};
