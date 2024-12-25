// Importing the Express library to create and manage routes.
const express = require('express');

// Importing controller functions from the cartController file.
// These functions handle the logic for adding items to the cart, removing items, and retrieving the cart.
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');

// Importing the authentication middleware to protect routes, ensuring only authorized users can access them.
const authMiddleware = require('../middleware/authMiddleware');

// Creating a new Express Router instance to define cart-related routes.
const router = express.Router();

// POST route to add an item to the cart.
// This route is protected by `authMiddleware`, ensuring the user is authenticated.
// Executes the `addToCart` controller function to handle the addition of a cart item.
router.post('/add', authMiddleware, addToCart);

// DELETE route to remove an item from the cart by its ID.
// Protected by `authMiddleware` and handled by the `removeFromCart` controller function.
router.delete('/remove/:cartItemId', authMiddleware, removeFromCart);

// GET route to retrieve the current user's cart.
// Protected by `authMiddleware` and handled by the `getCart` controller function.
router.get('/', authMiddleware, getCart);

// Exporting the router to make these routes accessible in other parts of the application.
module.exports = router;
