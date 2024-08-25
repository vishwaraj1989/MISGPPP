
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false); // Add this line to suppress the warning

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

