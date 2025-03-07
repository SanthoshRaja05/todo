const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Optionally, you could also check if the username already exists
    // let existingUsername = await User.findOne({ username });
    // if (existingUsername) {
    //   return res.status(400).json({ message: 'Username already exists' });
    // }

    // Create and save the new user
    user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// authController.js
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // or username, if that’s how you handle login
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user info so the frontend can store it
    return res.json({
      message: 'Login successful',
      username: user.username,  // or user.email
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

