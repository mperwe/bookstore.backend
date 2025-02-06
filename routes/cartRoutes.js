const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {authMiddleware} =require('../middlewares/authMiddleware')

router
.get('/:userId',authMiddleware, cartController.getCart)
.post('/add', cartController.addToCart)
.patch('/:userId/update/:bookId', cartController.updateCartItemQuantity)
.delete('/:userId/remove/:bookId', cartController.removeFromCart)
.delete('/:userId/clear', cartController.clearCart);


module.exports = router;