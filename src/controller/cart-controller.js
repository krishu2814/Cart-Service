const CartService = require('../service/cart-service');

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    async addToCart(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in req.user -> Authentication
            console.log("User ID from token:", userId);
            console.log(req.body);
            const token = req.headers['authorization']; // Extract token from Authorization header
            console.log("Token from header:", token);
            const cartItem = await this.cartService.addToCart(userId, req.body, token);
            return res.status(200).json({
                success: true,
                message: 'Product added to cart successfully',
                data: cartItem,
                err: {}
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to add product to cart',
                data: {},
                err: error.message
            });
        }
    }

    async updateCart(req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.params;
            const { quantity } = req.body;

            const updatedCart = await this.cartService.updateCart(userId, productId, quantity);
            return res.status(200).json({
                success: true,
                message: 'Cart updated successfully',
                data: updatedCart,
                err: {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update cart',
                data: {},
                err: error.message
            });
        }
    }

    async clearCart(req, res) {
        try {
            const userId = req.user.id;
            await this.cartService.clearCart(userId);
            return res.status(200).json({
                success: true,
                message: 'Cart cleared successfully',
                data: {},
                err: {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to clear cart',
                data: {},
                err: error.message
            });
        }
    }

    async getCart(req, res) {
        try {
            const userId = req.user.id;
            console.log("User ID from token:", userId);
            const cart = await this.cartService.getCartByUserId(userId);
            console.log("Cart retrieved:", cart);
            return res.status(200).json({
                success: true,
                message: 'Cart retrieved successfully',
                data: cart,
                err: {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve cart',
                data: {},
                err: error.message
            });
        }
    }

    async getAllCarts(req, res) {
        try {
            const carts = await this.cartService.getAllCarts();
            return res.status(200).json({
                success: true,
                message: 'Carts retrieved successfully',
                data: carts,
                err: {}
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve carts',
                data: {},
                err: error.message
            });
        }
    }   

}

module.exports = CartController;
