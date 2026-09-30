const CartService = require('../service/cart-service');

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    _getErrorStatus(errorMessage) {
        if (!errorMessage) return 500;
        const msg = errorMessage.toLowerCase();
        if (msg.includes('not found') || msg.includes('does not exist')) {
            return 404;
        }
        if (msg.includes('required') || msg.includes('invalid') || msg.includes('not enough stock') || msg.includes('cannot') || msg.includes('positive integer')) {
            return 400;
        }
        return 500;
    }

    async addToCart(req, res) {
        try {
            const userId = req.user.id;
            const token = req.headers['authorization'];
            const cartItem = await this.cartService.addToCart(userId, req.body, token);
            return res.status(200).json({
                success: true,
                message: 'Product added to cart successfully',
                data: cartItem,
                err: {}
            });
        } catch (error) {
            const status = this._getErrorStatus(error.message);
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to add product to cart',
                data: {},
                err: error.message
            });
        }
    }

    async updateCart(req, res) {
        try {
            const userId = req.user.id;
            const productId = req.params.productId || req.body.productId;
            const { quantity } = req.body;

            const updatedCart = await this.cartService.updateCart(userId, productId, quantity);
            return res.status(200).json({
                success: true,
                message: 'Cart updated successfully',
                data: updatedCart,
                err: {}
            });
        } catch (error) {
            const status = this._getErrorStatus(error.message);
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to update cart',
                data: {},
                err: error.message
            });
        }
    }

    async removeItem(req, res) {
        try {
            const userId = req.user.id;
            const productId = req.params.productId || req.body.productId;

            const updatedCart = await this.cartService.removeItem(userId, productId);
            return res.status(200).json({
                success: true,
                message: 'Item removed from cart successfully',
                data: updatedCart,
                err: {}
            });
        } catch (error) {
            const status = this._getErrorStatus(error.message);
            return res.status(status).json({
                success: false,
                message: error.message || 'Failed to remove item from cart',
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
            const cart = await this.cartService.getCartByUserId(userId);
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
