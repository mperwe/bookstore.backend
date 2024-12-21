const express = require('express');
const CartItem = require('../models/CartItem');

const router = express.Router();

// Add to cart
router.post('/', async (req, res) => {
  const { user, book, quantity } = req.body;
  const cartItem = await CartItem.create({ user, book, quantity });
  res.status(201).json(cartItem);
});
module.exports = router;
