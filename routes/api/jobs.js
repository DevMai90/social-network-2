const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Load Models
const User = require('../../models/User');
const Job = require('../../models/Job');

// @route   POST /api/jobs
// @desc    Create a job post
// @access  Private
router.post('/', auth, async (req, res) => {
  const {
    seniority,
    term,
    position,
    skills,
    description,
    location,
    salary,
    benefits,
    contactName,
    contactInfo
  } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newJob = new Job({
      user: req.user.id,
      seniority,
      term,
      position,
      skills,
      description,
      location,
      salary,
      benefits,
      contactName,
      contactInfo
    });

    const job = await newJob.save();

    // console.log(user);
    res.json(job);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
