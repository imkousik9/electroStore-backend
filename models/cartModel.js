const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      active: Boolean
    }
  ],
  addressId: { type: Schema.Types.ObjectId, ref: 'Address', default: null }
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.productId',
    select: ['name', 'price', 'image', 'brand', 'offer', 'inStock']
  });
  next();
});

cartSchema.pre(/^save/, function (next) {
  this.populate({
    path: 'products.productId',
    select: ['name', 'price', 'image', 'brand', 'offer', 'inStock']
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
