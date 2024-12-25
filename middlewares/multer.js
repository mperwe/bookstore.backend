// Importing the Multer library for handling file uploads and the Path module for working with file paths.
const multer = require('multer');
const path = require('path');

// Configuring storage options for Multer.
const storage = multer.diskStorage({
  // Setting the destination folder where uploaded files will be saved.
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the "uploads" directory.
  },

  // Configuring the filename for uploaded files.
  // Each file is prefixed with the current timestamp to ensure unique filenames.
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Defining a file filter to restrict uploaded files to specific image formats.
const fileFilter = (req, file, cb) => {
  // Allowed file types: jpeg, jpg, png, gif.
  const fileTypes = /jpeg|jpg|png|gif/;

  // Checking the file extension and MIME type against the allowed types.
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  // If both the extension and MIME type are valid, accept the file.
  if (extname && mimetype) {
    cb(null, true);
  } else {
    // Otherwise, reject the file with an error message.
    cb('Error: Images only!');
  }
};

// Creating an instance of Multer with the configured storage and file filter.
const upload = multer({
  storage, // The storage configuration for Multer.
  fileFilter, // The file filter to restrict file uploads.
});

// Exporting the upload instance for use in other parts of the application.
module.exports = { upload };
