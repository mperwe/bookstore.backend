// Import necessary modules
const express = require('express'); // Express to create the router and handle HTTP requests
const Order = require('../models/Order'); // Import the Order model to interact with the Order data in the database
const CartItem = require('../models/CartItem'); // Import the CartItem model to interact with the CartItem data

// Initialize an Express router to handle the routes
const router = express.Router();

// Route to place an order
// This route handles the POST request to create a new order
router.post('/create', async (req, res) => {
  // Destructure the required data from the request body
  const { userId, cartItems } = req.body;

  try {
    // Find the cart items from the database using the cart item IDs
    const items = await CartItem.find({ _id: { $in: cartItems } }).populate('book');
    
    // Calculate the total price for the order by summing up the price of each book * quantity
    const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    // Create a new order instance with the user ID, items, total amount, and initial status set to 'pending'
    const order = new Order({
      user: userId,
      items,
      total,
      status: 'pending',
    });

    // Save the order in the database
    await order.save();
    
    // Send a successful response with the order details
    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    // In case of an error, send a response with an error message
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Export the router to be used in the main application
module.exports = router;
