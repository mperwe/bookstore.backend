const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


const router = express.Router();

// create an order
router
.post('/create',authMiddleware, orderController.createOrder)

// get all orders for a user
.get('/user/:userId',authMiddleware, orderController.getUserOrders)

//  update an order's status
.patch('/:orderId/status', authMiddleware, orderController.updateOrderStatus)

module.exports = router;
