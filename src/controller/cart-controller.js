const CartService = require('../service/cart-service');

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    async addToCart(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in req.user -> Authentication
            const cartItem = await this.cartService.addToCart(userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Product added to cart successfully',
                data: cartItem,
                err: {}
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add product to cart',
                data: {},
                err: error.message
            });
        }
    }

}

module.exports = CartController;
