const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      active: Boolean
    }
  ]
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.productId',
    select: ['name', 'price', 'image', 'brand', 'offer', 'inStock']
  });
  next();
});

wishlistSchema.pre(/^save/, function (next) {
  this.populate({
    path: 'products.productId',
    select: ['name', 'price', 'image', 'brand', 'offer', 'inStock']
  });
  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
