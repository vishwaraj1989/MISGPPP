// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./connectDB');
// const router = require('./api/formRoutes');
// const authRoutes = require('./api/authRoutes');

// dotenv.config();

// const app = express();

// app.use(express.json()); // Middleware to parse JSON requests
// app.use(cors()); // Enable CORS

// connectDB();

// // // Use registration routes
// app.use('/api/formRoutes', router);

// app.use('/api/authRoutes', authRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// index.js



// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./connectDB');  // Imports the connectDB function
// const dotenv = require('dotenv');  // Imports dotenv to load environment variables
// const cors = require('cors');  // Imports CORS middleware
// const morgan = require('morgan');  // Imports morgan for request logging
// const router = require('./api/formRoutes');
// const authRoutes = require('./api/authRoutes');

// dotenv.config();  // Loads environment variables from .env file

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());  // Parses JSON requests
// app.use(cors());  // Enables CORS for all origins
// app.use(morgan('dev'));  // Logs HTTP requests

// // API route for form submissions
// // Use registration routes
// app.use('/api/formRoutes', router);

// app.use('/api/authRoutes', authRoutes);

// // Connect to MongoDB
// connectDB()
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const formRoutes = require('./api/formRoutes');
const authRoutes = require('./api/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// API routes
app.use('/api/formRoutes', formRoutes);
app.use('/api/authRoutes', authRoutes);

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
