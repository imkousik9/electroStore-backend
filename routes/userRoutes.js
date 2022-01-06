const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');

const {
  getUserDetails,
  login,
  registerUser
} = require('../controllers/userController');

router.route('/signup').post(registerUser);
router.route('/login').post(login);
router.route('/me').get(isAuth, getUserDetails);

module.exports = router;
