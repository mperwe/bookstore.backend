// Importing the Book model, which represents the structure of a book document in the database.
const Book = require('../models/book'); // Replace with your Book model

// Function to create a new book.
const createBook = async (req, res) => {
  try {
    // Extracting title, author, and description from the request body.
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

    // Sending a success response with the created book data.
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    // Handling errors and sending a server error response.
    res.status(500).json({ error: error.message });
  }
};

// Function to get all books.
const getBooks = async (req, res) => {
  try {
    // Fetching all books from the database.
    const books = await Book.find();

    // Sending a success response with the list of books.
    res.status(200).json(books);
  } catch (error) {
    // Handling errors and sending a server error response.
    res.status(500).json({ error: error.message });
  }
};

// Function to get a single book by its ID.
const getBookById = async (req, res) => {
  try {
    // Fetching a book by its ID from the request parameters.
    const book = await Book.findById(req.params.id);

    // Checking if the book exists; if not, send a "not found" response.
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Sending a success response with the book data.
    res.status(200).json(book);
  } catch (error) {
    // Handling errors and sending a server error response.
    res.status(500).json({ error: error.message });
  }
};

// Function to update a book.
const updateBook = async (req, res) => {
  try {
    // Extracting title, author, and description from the request body.
    const { title, author, description } = req.body;

    // Preparing updated data, including the image if provided in the request.
    const updatedData = {
      title,
      author,
      description,
      image: req.file ? req.file.path : undefined, // Only update the image if a new one is provided.
    };

    // Finding the book by its ID and updating it with the provided data.
    const book = await Book.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, // Return the updated document.
    });

    // Checking if the book exists; if not, send a "not found" response.
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Sending a success response with the updated book data.
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    // Handling errors and sending a server error response.
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a book by its ID.
const deleteBook = async (req, res) => {
  try {
    // Finding and deleting the book by its ID from the request parameters.
    const book = await Book.findByIdAndDelete(req.params.id);

    // Checking if the book exists; if not, send a "not found" response.
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Sending a success response indicating the book was deleted.
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    // Handling errors and sending a server error response.
    res.status(500).json({ error: error.message });
  }
};

// Exporting all the functions to make them available for use in other parts of the application.
module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
