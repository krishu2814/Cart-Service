const Cart = require("../model/cart-model");

class CartRepository {
  async createCart(cartData) {
    // console.log("Creating cart with data:", cartData);

    return await Cart.create(cartData);
  }

  async getCartByUserId(userId) {
    // console.log("Fetching cart for user ID:", userId);

    return await Cart.findOne({ userId });
  }

  async updateCart(userId, cartData) {
    return await Cart.findOneAndUpdate({ userId }, cartData, { new: true });
  }

  async clearCart(userId) {
    // console.log(`Clearing cart for user ID: ${userId}`);

    return await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          items: [],
          totalPrice: 0,
        },
      },
      {
        new: true,
      },
    );
  }

  async getAllCarts() {
    return await Cart.find();
  }
}

module.exports = CartRepository;
