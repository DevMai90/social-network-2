const config = require('config');
// Initialize multer-s3
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  region: config.get('region')
});

const s3 = new aws.S3({});

// Configure multer storage and create instance
const upload = multer({
  // Moved file type validation to backend
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype === 'application/pdf') cb(null, true);
  //   else cb(new Error('Invalid file type. Please upload PDF.'), false);
  // },
  storage: multerS3({
    s3,
    bucket: 'davidmulters3test/resume',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        mimetype: file.mimetype,
        originalName: file.originalname
      });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      // First parameter is an error. Add fieldname?
      cb(null, req.user.id);
    }
  })
});

// const resumeUpload = upload.single('resume');
module.exports = upload;
