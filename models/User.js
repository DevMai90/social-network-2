const mongoose = require('mongoose');

// Contains objects with fields that we want
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export as a variable called User. The model name is user which uses the UserSchema
module.exports = User = mongoose.model('user', UserSchema);
