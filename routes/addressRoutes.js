const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const {
  getUserAddresses,
  createNewAddress,
  updateAddress,
  deleteAddress
} = require('../controllers/addressController');

router.use(isAuth);
router.route('/').get(getUserAddresses).post(createNewAddress);
router.route('/:id').put(updateAddress).delete(deleteAddress);

module.exports = router;
