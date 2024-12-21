const express = require('express');
const upload = require('../config/multer');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

// Add book with an image
router.post('/add', upload.single('image'), createBook);

// Get all books
router.get('/', getBooks);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;
