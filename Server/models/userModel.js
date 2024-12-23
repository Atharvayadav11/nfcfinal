
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  file: { type: String }, 
  location: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, 
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
