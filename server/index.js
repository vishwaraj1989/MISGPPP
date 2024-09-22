// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const formRoutes = require('./api/formRoutes');
// const authRoutes = require('./api/authRoutes');
// const connectDB = require('./connectDB');


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json()); // Replaces bodyParser.json()
// app.use(cors());
// app.use(morgan('dev'));

// // API routes
// app.use('/api/formRoutes', formRoutes);
// app.use('/api/authRoutes', authRoutes);

// // Connect to MongoDB
// connectDB();

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
//     ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// ============== Single Port Run =====================================================================================================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const formRoutes = require('./api/formRoutes'); // Ensure correct path
const authRoutes = require('./api/authRoutes'); // Ensure correct path
const connectDB = require('./connectDB'); // Ensure correct path

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/formRoutes', formRoutes);
app.use('/api/authRoutes', authRoutes);

// Serve static files from the React 'build' directory
app.use(express.static(path.join(__dirname, '../build')));

// Handle React front-end routing, serving index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

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
