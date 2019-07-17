const express = require('express');
const router = express.Router();

const upload = require('../../services/upload');
const singleUpload = upload.single('image');

// @route   POST /api/upload
// @desc    Post new file
// @access  Public/private
router.post('/', (req, res) => {
  // 'image' is the key we are sending
  singleUpload(req, res, err => {
    if (err) {
      res.status(422).send({ errors: [{ msg: err.message }] });
    } else {
      res.json({ imageUrl: req.file.location });
    }
  });
});

module.exports = router;
