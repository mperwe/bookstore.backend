// Import necessary modules
const express = require('express'); // Express to create the router and handle HTTP requests
const CartItem = require('../models/CartItem'); // Import the CartItem model to interact with the cart data in the database

// Initialize an Express router to handle the routes
const router = express.Router();

// Route to add an item to the cart
// This route handles the POST request to add a new cart item
// It expects the user's ID, the book's ID, and the quantity to be sent in the request body
router.post('/', async (req, res) => {
  // Destructure the required data from the request body
  const { user, book, quantity } = req.body;

  // Create a new cart item and save it to the database
  const cartItem = await CartItem.create({ user, book, quantity });

  // Return a successful response with the created cart item
  res.status(201).json(cartItem); // The status 201 indicates that the resource (cart item) was successfully created
});

// Export the router to be used in the main application
module.exports = router;
