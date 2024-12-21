const Book = require('../models/Book');

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const book = new Book({ title, author, price, image: imageUrl });
    await book.save();

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, price },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};
