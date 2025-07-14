const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


const router = express.Router();


router
.get('/',orderController.getAllOrders)

.get('/user/:userId',authMiddleware,orderController.getUserOrders)

.post('/create', authMiddleware,orderController.createOrderFromCart)

.patch('/:orderId/status',orderController.updateOrderStatus)

.delete('/:orderId', orderController.deleteOrderById);


 module.exports = router;
