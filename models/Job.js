const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  // Reference the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  seniority: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  benefits: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  },
  contactName: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  }
});

module.exports = Job = mongoose.model('job', JobSchema);
