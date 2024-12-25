// Import necessary modules
const express = require("express"); // Express for routing HTTP requests
const router = express.Router(); // Router to handle HTTP requests for book-related routes
const Book = require("../models/Book"); // Import the Book model to interact with the Book collection in the database

// Route to search for books by title or author
// This route handles the GET request to search for books based on a query parameter
router.get("/search", async (req, res) => {
  // Destructure the query parameter from the request URL
  const { query } = req.query; // Extract the search query from the URL query string

  try {
    // Search for books by title or author using case-insensitive regex match
    const books = await Book.find({
      $or: [
        // Case-insensitive search for books with title matching the query
        { title: { $regex: query, $options: "i" } },
        // Case-insensitive search for books with author matching the query
        { author: { $regex: query, $options: "i" } },
      ],
    });

    // Send back the found books as a JSON response
    res.json(books); // Return the matched books to the client
  } catch (error) {
    // In case of an error, log it and send a server error response
    console.error("Error searching books:", error);
    res.status(500).send("Server error"); // Send a 500 status code for server-side errors
  }
});

// Export the router to be used in the main application
module.exports = router;
