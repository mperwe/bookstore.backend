const Order = require('../models/Order');
const CartItem = require('../models/CartItem');


exports.createOrder = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    // Retrieve cart items from the database
    const items = await CartItem.find({ _id: { $in: cartItems } }).populate('book');

    // Calculate the total price
    const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    // Create the order
    const order = new Order({
      user: userId,
      items,
      total,
      status: 'pending',
    });

    // Save the order to the database
    await order.save();

    // Respond with the order details
    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

// retrieve a user's orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find orders for the given user
    const orders = await Order.find({ user: userId }).populate('items.book');

    res.status(200).json({ message: 'User orders retrieved', orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

// update an order's status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Update the order status
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

