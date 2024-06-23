const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.error('User already registered');
      return res.status(400).json({ message: 'User already registered.' });
    }

    // Create new user
    user = new User({ name, email, password });

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      console.error('Failed to generate salt');
    }
    user.password = await bcrypt.hash(password, salt);
    if (!user.password) {
      console.error('Failed to hash password');
    }

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
    res.header('Authorization', token).json({ token });
  } catch (err) {
    console.error('Error in registerUser:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.error('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error in loginUser:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
};

const Getuser= async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

module.exports = { registerUser, loginUser, Getuser};
