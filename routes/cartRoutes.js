const express = require('express');
const CartItem = require('../models/CartItem');
const Book = require('../models/Book');

const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const cartItem = new CartItem({ user: userId, book: bookId, quantity });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

module.exports = router;
