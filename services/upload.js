// Import dependencies
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');

// Configure AWS
aws.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  region: config.get('region')
});

// Initiate s3
const s3 = new aws.S3({});

// Filter file types
const fileFilter = (req, file, cb) => {
  // Mimetype - type/subtype
  // type is general category (image, video, text, etc)
  // subtype is the exact type
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. File type must be jped or png.'), false);
  }
};

// Initiate multer
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'davidmulters3test',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'file.fileName' });
    },
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
