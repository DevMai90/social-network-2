const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// Load User model
const User = require('../../models/User');

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    // Checks name field. Takes in optional message argument
    check('name', 'Name field is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user's avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Create instance of new User. This is making an instance, but is it not saved yet.
      user = new User({
        name,
        email,
        password,
        avatar
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
