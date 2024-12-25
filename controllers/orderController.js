// Importing the Express library to create and manage routes.
const express = require('express');

// Importing controller functions from the orderController file.
// These functions handle the logic for placing an order and retrieving orders.
const { placeOrder, getOrders } = require('../controllers/orderController');

// Importing the authentication middleware to protect routes, ensuring only authorized users can access them.
const authMiddleware = require('../middleware/authMiddleware');

// Creating a new Express Router instance to define order-related routes.
const router = express.Router();

// POST route to place a new order.
// This route is protected by `authMiddleware`, ensuring the user is authenticated.
// Executes the `placeOrder` controller function to handle the order placement logic.
router.post('/place', authMiddleware, placeOrder);

// GET route to retrieve all orders for the authenticated user.
// This route is also protected by `authMiddleware` and handled by the `getOrders` controller function.
router.get('/', authMiddleware, getOrders);

// Exporting the router to make these routes accessible in other parts of the application.
module.exports = router;
