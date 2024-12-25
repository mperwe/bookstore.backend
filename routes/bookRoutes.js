// Import necessary modules
const express = require('express'); // Express to create the router and handle HTTP requests
const { 
  createBook, // Controller function to create a new book
  getBooks, // Controller function to get all books
  getBookById, // Controller function to get a book by its ID
  updateBook, // Controller function to update an existing book
  deleteBook, // Controller function to delete a book
} = require('../controllers/bookController'); // Importing controller functions for book operations
const { upload } = require('../middlewares/multer'); // Importing the upload middleware for handling file uploads

// Initialize an Express router to handle the routes
const router = express.Router();

// Route to add a book with an image
// This route handles the POST request to add a new book, using the 'upload.single('image')' middleware 
// to handle file upload for the book's image, and then calls the 'createBook' function from the controller
router.post('/', upload.single('image'), createBook);

// Route to get all books
// This route handles the GET request to fetch all books from the database
router.get('/', getBooks);

// Route to get a single book by its ID
// This route handles the GET request to fetch a specific book by its ID (from the URL parameter)
router.get('/:id', getBookById);

// Route to update an existing book
// This route handles the PUT request to update a book's details by its ID, including uploading an image if needed
// It uses the 'upload.single('image')' middleware to handle the file upload for the image and then calls 'updateBook'
router.put('/:id', upload.single('image'), updateBook);

// Route to delete a book by its ID
// This route handles the DELETE request to remove a book from the database by its ID
router.delete('/:id', deleteBook);

// Export the router to be used in the main application
module.exports = router;
