// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// // Route to sign up a new user
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Log incoming data to verify
//     console.log('Request Body:', req.body);

//     // Check for required fields
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Check for valid email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     // Check password length
//     if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash the password
//     const password_hash = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({
//       email,
//       password_hash,
//     });

//     // Save the user to the database
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(`Error registering user: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to log in a user
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for required fields
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the hashed password
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error(`Error logging in: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || '73d2e1b0a47e4e5d9fc1bf87c3eae1782fa4e8e5679f15b8dfbb7c917f5ac3e9';

// Route to sign up a new user
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation and other steps as before...

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ email, password_hash });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation and other steps as before...

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
