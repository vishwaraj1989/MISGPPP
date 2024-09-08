const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v.endsWith('@gebmail.com');
      },
      message: props => `${props.value} must end with '@gebmail.com'`
    }
  },
  password_hash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
