const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
// Define schema for login data
const loginDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
 
// Hash password before saving to the database
loginDataSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password has changed
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
 
module.exports = mongoose.model('loginData', loginDataSchema);
