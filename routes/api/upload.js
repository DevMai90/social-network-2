// Import dependencies
const aws = require('aws-sdk'),
  express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  config = require('config');

// Configure AWS
aws.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  region: config.get('region')
});

// Initiate s3
const s3 = new aws.S3({});

// Initiate multer
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'davidmulters3test',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'file.fieldname' });
    },
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

// Single image upload
const singleUpload = upload.single('image');

// @route   POST /api/upload
// @desc    Post new file
// @access  Public/private
router.post('/', singleUpload, function(req, res, next) {
  res.json({ imageUrl: req.file.location });
});
// router.post('/', function(req, res) {
//   singleUpload(req, res, function(err) {
//     return res.json({ imageUrl: req.file });
//   });
// });
module.exports = router;
