require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/dbConnect');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

async function initializeExpress() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('API is running....');
  });
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/address', addressRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/wishlist', wishlistRoutes);
  app.use('/api/orders', orderRoutes);

  app.use(notFound);
  app.use(errorHandler);

  connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, console.log(`Server running on port ${PORT}`));
}

initializeExpress();
