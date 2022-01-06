const Address = require('../models/addressModel');
const catchAsync = require('../utils/catchAsync');

const { extend } = require('lodash');

const getUserAddresses = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find(
      { userId },
      {
        name: 1,
        streetAddress: 1,
        city: 1,
        state: 1,
        country: 1,
        zipCode: 1,
        phoneNumber: 1
      }
    );
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const createNewAddress = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;

    let newAddress = req.body;
    newAddress = new Address({ ...newAddress, userId });
    await newAddress.save();

    const updatedAddresses = await Address.find(
      { userId: userId },
      {
        name: 1,
        streetAddress: 1,
        city: 1,
        state: 1,
        country: 1,
        zipCode: 1,
        phoneNumber: 1
      }
    );
    res.status(201).json(updatedAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const updateAddress = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const addressUpdates = req.body;
    let address = await Address.findById({ _id: req.params.id, userId });

    if (!address) {
      res
        .status(404)
        .json({ message: 'This address is not associated with user' });
      return;
    }

    address = extend(address, addressUpdates);

    await address.save();
    const updatedAddresses = await Address.find(
      { userId: userId },
      {
        name: 1,
        streetAddress: 1,
        city: 1,
        state: 1,
        country: 1,
        zipCode: 1,
        phoneNumber: 1
      }
    );

    res.status(200).json(updatedAddresses);
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

const deleteAddress = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.findById({ _id: req.params.id, userId });

    if (!address) {
      res
        .status(404)
        .json({ message: 'This addresss is not asscociated with user' });
      return;
    }
    await address.remove();

    const updatedAddresses = await Address.find(
      { userId: userId },
      {
        name: 1,
        streetAddress: 1,
        city: 1,
        state: 1,
        country: 1,
        zipCode: 1,
        phoneNumber: 1
      }
    );

    res.status(200).json(updatedAddresses);
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message
    });
  }
});

module.exports = {
  getUserAddresses,
  createNewAddress,
  updateAddress,
  deleteAddress
};
