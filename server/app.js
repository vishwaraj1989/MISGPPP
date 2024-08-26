import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './connectDB';  // Imports the connectDB function
import registerRoutes from './routes/Router';  // Imports the register routes file
import dotenv from 'dotenv';  // Imports dotenv to load environment variables
import cors from 'cors';  // Imports CORS middleware
import morgan from 'morgan';  // Imports morgan for request logging

dotenv.config();  // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());  // Parses JSON requests
app.use(cors());  // Enables CORS for all origins
app.use(morgan('dev'));  // Logs HTTP requests

// API route for form submissions
app.use('/api/register', registerRoutes);


// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});