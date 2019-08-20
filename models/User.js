const mongoose = require('mongoose');

// Contains an object with fields that we want
// Each field has optional attributes.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
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

// Export the model as a variable called User.
// The model name is user. MongoDB will automatically put in a collection with the plural version of the schema name
// (ex. user document automatically gets placed in users collection)
// Second argument references our schema.
// Warning: Do not update schema name as it will change the id references on MongoDB.
module.exports = User = mongoose.model('user', UserSchema);
