const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {authMiddleware} =require('../middlewares/authMiddleware')

router
.get('/:userId',authMiddleware, cartController.getCart)
.post('/add', authMiddleware,cartController.addToCart)
.patch('/:userId/update/:bookId',authMiddleware,cartController.updateCartItemQuantity)
.delete('/:userId/remove/:bookId',authMiddleware,cartController.removeFromCart)
.delete('/:userId/clear',authMiddleware,cartController.clearCart);


module.exports = router;