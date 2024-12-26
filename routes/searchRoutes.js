const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController'); // Importing the Book controller

// Route to search books by title or author.
// This should always come first to avoid conflicts with dynamic routes like `/:id`.
router.get('/', BookController.searchBooks);

// Route to fetch a single book by its ID.
router.get('/:id', BookController.getBookById);

module.exports = router;
