// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./connectDB');
// const router = require('./api/formRoutes');

// dotenv.config();

// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());

// // Enable CORS for all routes
// app.use(cors());

// // Connect to MongoDB
// connectDB();

// // Use registration routes
// app.use('/api/formRoutes', router);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./connectDB');
const router = require('./api/formRoutes');
const authRoutes = require('./api/authRoutes');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS

connectDB();

// // Use registration routes
app.use('/api/formRoutes', router);

app.use('/api/authRoutes', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

