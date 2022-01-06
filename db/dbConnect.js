const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database connected.');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
