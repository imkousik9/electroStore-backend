const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const generateToken = require('../utils/generateToken');

const registerUser = catchAsync(async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(409).json({
        message: 'Account already exists for this email'
      });
      return;
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    res.status(201).json({
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      token: generateToken(newUser._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong!',
      errorMessage: error.message
    });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong!',
      errorMessage: error.message
    });
  }
});

const getUserDetails = catchAsync(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = {
  registerUser,
  login,
  getUserDetails
};
