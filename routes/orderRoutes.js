const express = require('express');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

const router = express.Router();

// Place an order
router.post('/create', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const items = await CartItem.find({ _id: { $in: cartItems } }).populate('book');
    const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    const order = new Order({
      user: userId,
      items,
      total,
      status: 'pending',
    });

    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

module.exports = router;
