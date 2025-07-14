const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Importing the Book controller

// Route to search books by title or author.
// This should always come first to avoid conflicts with dynamic routes like `/:id`.
// router.get('/', bookController.searchBooks);

// Route to fetch a single book by its ID.
// router.get('/:id', bookController.getBookById);

module.exports = router;
