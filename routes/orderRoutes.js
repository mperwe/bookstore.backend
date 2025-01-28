const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


const router = express.Router();


router
.get('/user/:userId',authMiddleware,orderController.getUserOrders)

// .post('/create',authMiddleware, orderController.createOrder)

// // get all orders for a user


// //  update an order's status
// .patch('/:orderId/status', authMiddleware, orderController.updateOrderStatus)

 module.exports = router;
