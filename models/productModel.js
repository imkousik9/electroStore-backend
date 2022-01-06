const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },

  image: {
    type: String
  },

  price: {
    type: Number,
    required: [true, 'Product price is required']
  },

  category: {
    type: String,
    required: [true, 'Product category is required']
  },

  brand: {
    type: String
  },

  inStock: {
    type: Boolean,
    required: [true, 'Product is instock information is required'],
    default: true
  },

  fastDelivery: {
    type: Boolean,
    default: false
  },

  rating: {
    starRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },

  offer: {
    type: Number,
    default: 0
  },

  availableQty: {
    type: Number,
    required: [true, 'Available quantity information is required']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
