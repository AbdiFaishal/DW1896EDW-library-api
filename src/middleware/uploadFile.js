const multer = require('multer');
const path = require('path');

// For uploading books image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, './uploads/');
    } else {
      cb(null, './userEpubs/');
    }
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, new Date().toISOString().replace(/:/g, '-') + fileName);
  },
});

const fileFilter = (req, file, cb) => {
  console.log('file: ', file);

  // reject a file
  if (file.fieldname === 'image') {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    if (file.mimetype === 'application/epub+zip') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

const uploadBook = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

// For uploading user avatar
const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './userUploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, new Date().toISOString().replace(/:/g, '-') + fileName);
  },
});

const avatarFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    // return cb('Only .jpeg .png format allowed!', false);
  }
};

const uploadAvatar = multer({
  storage: storageUser,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: avatarFilter,
});

module.exports = {
  uploadBook,
  uploadAvatar,
};
