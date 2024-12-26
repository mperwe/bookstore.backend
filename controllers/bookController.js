// Importing the Book model, which represents the structure of a book document in the database.
const Book = require('../models/Book');

// Function to create a new book.
const createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // Creating a new Book instance with the provided data and uploaded image (if any).
    const book = new Book({
      title,
      author,
      description,
      image: req.file ? req.file.path : null, // Save the uploaded image path if an image is provided.
    });

    // Saving the book to the database.
    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get all books.
const getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetching all books from the database.
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a single book by its ID.
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Fetching a book by its ID.
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update a book.
const updateBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // Preparing updated data, including the image if provided in the request.
    const updatedData = {
      title,
      author,
      description,
      image: req.file ? req.file.path : undefined,
    };

    const book = await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a book by its ID.
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id); // Deleting the book by its ID.
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to search for books by query.
const searchBooks = async (req, res) => {
  const { query } = req.query; // Extracting the search query from request parameters.

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(books); // Returning the matching books.
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Exporting all the functions to make them available for use in other parts of the application.
module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks, // Exporting the searchBooks function for routing.
};
