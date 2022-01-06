const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: 'Account already exists for this email',
      required: 'Email id is required',
      validate: {
        validator: function (value) {
          return /^.+@.+\.com$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`
      }
    },

    password: {
      type: String,
      required: 'Password is required',
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
            value
          );
        },
        message: (props) =>
          `Password should contain 8 letters(atleast one number, one smallcase and uppercase alphabets)`
      }
    },

    firstName: { type: String, required: 'first name is required' },
    lastName: { type: String, required: 'last name is required' }
  },
  {
    timestamps: true
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
