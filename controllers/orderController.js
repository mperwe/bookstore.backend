const Order = require('../models/Order');
const Cart = require('../models/CartItem');


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.book');
    res.status(200).json({'Orders made': orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};



// retrieve a user's orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    
    const orders = await Order.find({ user: userId }).populate('items.book');

    res.status(200).json({ message: 'User orders retrieved', orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};



exports.createOrderFromCart = async (req, res) => {
  const { userId } = req.body;

  try {
    // Step 1: Fetch the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.book');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Step 2: Calculate the total price of the cart
    const total = cart.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    // Step 3: Create a new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map(item => ({
        book: item.book._id,
        quantity: item.quantity,
      })),
      total,
    });

    // Step 4: Save the order
    const savedOrder = await newOrder.save();

    // Step 5: Clear the cart
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};


// // update an order's status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

exports.deleteOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};