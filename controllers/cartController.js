const Cart = require('../models/CartItem');
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        
        const cartItems = await Cart.find({ user: userId }).populate('book');

        res.status(200).json({'Cart-Items:':cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};


exports.addToCart = async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    try {
        // Check if the item already exists in the cart
        let cartItem = await Cart.findOne({ user: userId, book: bookId });

        if (cartItem) {
        
            cartItem.quantity += quantity;
        } else {
       
            cartItem = new Cart({
                user: userId,
                book: bookId,
                quantity: quantity
            });
        }

        await cartItem.save();

        res.status(200).json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    const { userId, bookId } = req.params;
    const { quantity } = req.body;

    try {
        // Find the cart item and update its quantity
        const cartItem = await Cart.findOneAndUpdate(
            { user: userId, book: bookId },
            { quantity: quantity },
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.status(200).json({ message: 'Cart item quantity updated successfully', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item quantity', error: error.message });
    }
};


exports.removeFromCart = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        // Find and delete the cart item
        const cartItem = await Cart.findOneAndDelete({ user: userId, book: bookId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.status(200).json({ message: 'Item removed from cart successfully',cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};

exports.clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
        // Delete all cart items for the user
        await Cart.deleteMany({ user: userId });

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};