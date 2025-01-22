const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
 
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },

  
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Defining a file filter to restrict uploaded files to specific image formats.
const fileFilter = (req, file, cb) => {
 
  const fileTypes = /jpeg|jpg|png|gif/;

  // Checking the file extension and MIME type against the allowed types.
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
   
    cb('Error: Images only!');
  }
};

// Creating an instance of Multer with the configured storage and file filter.
const upload = multer({
  storage,
  fileFilter,
});

module.exports = { upload };
