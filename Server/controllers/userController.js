const User = require('../models/userModel'); // Ensure correct path

exports.registerUser = async (req, res) => {
  const {  fullName,age, gender, email, phoneNumber, location, address, password,confirmPassword } = req.body;

  // Handle file if it exists
  if (req.file) {
    console.log('File:', req.file);
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Create new user
    const user = new User({
      fullName,
      age,
      gender,
      email,
      phoneNumber,
      file: req.file ? req.file.path : null,
      location,
      address,
      password, 
      confirmPassword,
    });

    await user.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};