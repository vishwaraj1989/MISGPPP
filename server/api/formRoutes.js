const express = require('express');
const router = express.Router();
const Register = require('../models/Register');

// Route to save registration data
router.post('/', async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.save();
    res.status(201).json({
      message: 'Data saved successfully',
      register,
    });
  } catch (error) {
    console.error(`Error saving registration data: ${error.message}`);
    res.status(400).json({
      error: error.message,
    });
  }
});

// Route to get all registration data with optional date filtering
router.get('/', async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let query = {};

    // Apply date filter if provided
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      query.rcDate = { $gte: from, $lte: to };
    }

    const registers = await Register.find(query);
    res.status(200).json(registers);
  } catch (error) {
    console.error(`Error retrieving registration data: ${error.message}`);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Route to get SR details by SR number
router.get('/srDetails/:srNumber', async (req, res) => {
  try {
    const srNumber = req.params.srNumber;
    const srDetails = await Register.findOne({ srNumber: srNumber });
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json(srDetails);
  } catch (error) {
    console.error(`Error retrieving SR details: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


// Route to get SR details by consumer number
router.get('/srDetailsByConsumer/:consumerNumber', async (req, res) => {
  try {
    const consumerNumber = req.params.consumerNumber;
    const srDetails = await Register.findOne({ consumerNumber: consumerNumber });
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json(srDetails);
  } catch (error) {
    console.error(`Error retrieving SR details: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific registration by ID
router.get('/:id', async (req, res) => {
  try {
    const register = await Register.findById(req.params.id);
    if (!register) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json(register);
  } catch (error) {
    console.error(`Error retrieving registration data: ${error.message}`);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Route to update SR details by SR number
router.put('/srDetails/:srNumber', async (req, res) => {
  try {
    const srNumber = req.params.srNumber;
    const updatedData = req.body;
    const srDetails = await Register.findOneAndUpdate({ srNumber }, updatedData, { new: true });
    if (!srDetails) {
      return res.status(404).json({ message: 'SR details not found' });
    }
    res.status(200).json({
      message: 'SR details updated successfully',
      srDetails,
    });
  } catch (error) {
    console.error(`Error updating SR details: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// Route to update a specific registration by ID
router.put('/:id', async (req, res) => {
  try {
    const register = await Register.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!register) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json({
      message: 'Registration updated successfully',
      register,
    });
  } catch (error) {
    console.error(`Error updating registration data: ${error.message}`);
    res.status(400).json({
      error: error.message,
    });
  }
});

// Route to delete a specific registration by ID
router.delete('/:id', async (req, res) => {
  try {
    const register = await Register.findByIdAndDelete(req.params.id);
    if (!register) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error(`Error deleting registration data: ${error.message}`);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;


