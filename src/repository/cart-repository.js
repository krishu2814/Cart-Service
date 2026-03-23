const Cart = require('../model/cart-model');

class CartRepository {
    async createCart(cartData) {
        return await Cart.create(cartData);
    }

    async getCartByUserId(userId) {
        return await Cart.findOne({ userId });
    }

    async updateCart(userId, cartData) {
        return await Cart.findOneAndUpdate({ userId }, cartData, { new: true });
    }

    async clearCart(userId) {
        return await Cart.findOneAndDelete({ userId });
    }
}

module.exports = CartRepository;
