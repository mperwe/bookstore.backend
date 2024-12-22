const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookstore', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  },
});

const upload = multer({ storage });

// Add a book with an image
router.post('/add', upload.single('image'), createBook);

// Get all books
router.get('/', getBooks);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;
