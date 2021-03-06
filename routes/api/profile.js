const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../middleware/multer');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // populate references documents from other collections.
    // Look into user collection. Grab the name and avatar fields
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile/
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      linkedin,
      instagram,
      facebook
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    for (field in req.body) {
      if (req.body[field]) {
        if (field === 'skills')
          profileFields.skills = req.body[field]
            .split(',')
            .map(skill => skill.trim());
        else profileFields[field] = req.body[field];
      }
    }
    // if (company) profileFields.company = company;
    // if (website) profileFields.website = website;
    // if (location) profileFields.location = location;
    // if (status) profileFields.status = status;
    // if (bio) profileFields.bio = bio;
    // if (githubusername) profileFields.githubusername = githubusername;
    // if (skills)
    //   profileFields.skills = skills.split(',').map(skill => skill.trim());

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.params.user_id },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });

    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/profile/
// @desc    Delete profile, user, and posts
// @access  private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove User posts
    await Post.deleteMany({ user: req.user.id });
    // Delete Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Delete User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experiece
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    // Build experience object
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile/experience/:exp_id
// @desc    Get profile experience by ID
// @access  Private
router.get('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const expIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    res.json(profile.experience[expIndex]);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience/:exp_id
// @desc    Update profile experience by ID
// @access  Private
router.put('/experience/:exp_id', auth, async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  const updatedExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const updateIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(updateIndex, 1, updatedExp);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/education/:edu_id
// @desc    Get profile education by ID
// @access  Private
router.get('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const eduIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    res.json(profile.education[eduIndex]);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education/:edu_id
// @desc    Update profile education by ID
// @access  Private
router.put(`/education/:edu_id`, auth, async (req, res) => {
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;

  const updatedEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const updateIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(updateIndex, 1, updatedEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldOfStudy', 'Field of Study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    // Build education object
    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/resume
// @desc    Upload resume
// @access  Private
router.post('/resume', [auth, upload.single('resume')], async (req, res) => {
  // req should have access to the file property now.
  // 'resume' should match the name of the file field being sent as part of the form submission
  const resumeUpload = upload.single('resume');
  if (!req.file) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Resume input field required' }] });
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Resume must be uploaded in PDF format' }] });
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    resumeUpload(req, res, err => {
      if (err) {
        res.status(422).send({ errors: [{ msg: err.message }] });
      } else {
        profile.resume = req.file.location;
        profile.save();
        res.json(profile);
      }
    });
  } catch (err) {
    // console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   delete api/profile/resume
// @desc    Delete uploaded resume
// @access  Private
router.delete('/resume', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.resume = undefined;

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
