const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Register = require('../models/Register');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware for validating userId
const validateUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    next();
  } catch (error) {
    console.error(`Error in validateUserId middleware: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to save registration data
router.post('/', validateUserId, async (req, res) => {
  try {
    const { userId, ...registrationData } = req.body;
    const register = new Register({ ...registrationData, userId });
    await register.save();
    res.status(201).json({
      message: 'Data saved successfully',
      register,
    });
  } catch (error) {
    console.error(`Error saving registration data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all registration data with optional date filtering and userId
router.get('/', async (req, res) => {
  try {
    const { fromDate, toDate, userId } = req.query;
    let query = {};

    // Validate and use userId if provided
    if (userId) {
      query.userId = userId;
    }

    // Apply date filter if provided
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      query.rcDate = { $gte: from, $lte: to };
    }

    const registers = await Register.find(query).populate('userId', 'email');
    res.status(200).json(registers);
  } catch (error) {
    console.error(`Error retrieving registration data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get SR details by SR number with optional userId
router.get('/srDetails/:srNumber', async (req, res) => {
  try {
    const srNumber = req.params.srNumber;
    const { userId } = req.query;  // Get userId from query parameters

    const query = { srNumber };
    if (userId) {
      query.userId = userId;
    }

    const srDetails = await Register.findOne(query).populate('userId', 'email');
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json(srDetails);
  } catch (error) {
    console.error(`Error retrieving SR details: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get SR details by consumer number with optional userId
router.get('/srDetailsByConsumer/:consumerNumber', async (req, res) => {
  try {
    const consumerNumber = req.params.consumerNumber;
    const { userId } = req.query;  // Get userId from query parameters

    const query = { consumerNumber };
    if (userId) {
      query.userId = userId;
    }

    const srDetails = await Register.findOne(query).populate('userId', 'email');
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json(srDetails);
  } catch (error) {
    console.error(`Error retrieving SR details: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update SR details by SR number
router.put('/srDetails/:srNumber', async (req, res) => {
  try {
    const srNumber = req.params.srNumber;
    const updatedData = req.body;
    const srDetails = await Register.findOneAndUpdate({ srNumber }, updatedData, { new: true }).populate('userId', 'email');
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json({
      message: 'SR details updated successfully',
      srDetails,
    });
  } catch (error) {
    console.error(`Error updating SR details: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch user data using JWT
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ userId: user._id }); // Include other fields as needed
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/:userId', async (req, res) => { // use ':userId' to match the route correctly
  try {
    const { userId } = req.params;

    // Log the userId for debugging
    console.log(`Received userId: ${userId}`);

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Query the Register collection by userId
    const registers = await Register.find({ userId });
    
    // Log the result for debugging

    if (!registers || registers.length === 0) {
      return res.status(404).json({ message: 'No records found for this user' });
    }
    
    res.status(200).json(registers);
  } catch (error) {
    console.error(`Error retrieving registration data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
