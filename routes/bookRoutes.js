const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a book
router.post('/', async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

module.exports = router;
