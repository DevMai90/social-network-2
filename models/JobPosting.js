const mongoose = require('mongoose');

const JobPosting = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  seniority: {
    type: String,
    required
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
  }
});

module.exports = JobPosting = mongoose.model('jobPosting', JobPosting);
