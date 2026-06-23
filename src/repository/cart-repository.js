const Cart = require('../model/cart-model');

class CartRepository {
    async createCart(cartData) {
        console.log("Creating cart with data:", cartData);
        return await Cart.create(cartData);
    }

    async getCartByUserId(userId) {
        console.log("Fetching cart for user ID:", userId);
        return await Cart.findOne({ userId });
    }

    async updateCart(userId, cartData) {
        return await Cart.findOneAndUpdate({ userId }, cartData, { new: true });
    }

    async clearCart(userId) {
        return await Cart.findOneAndDelete({ userId });
    }

    async getAllCarts() {
        return await Cart.find();
    }
    
}

module.exports = CartRepository;
