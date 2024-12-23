const cloudinary = require('../config/cloudinary'); // Import existing Cloudinary configuration
const Book = require('../models/Book'); // Import Book model

const createBook = async (req, res) => {
  try {
    const { title, author, price, stock } = req.body;

    // If an image was uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    }

    // Create a new book entry
    const book = new Book({
      title,
      author,
      price,
      stock,
      image: imageUrl,
    });

    await book.save();

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error('Error creating book:', error.message);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, stock } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, price, stock },
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

module.exports = { createBook, getBooks, updateBook, deleteBook };
