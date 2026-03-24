const CartRepository = require('../repository/cart-repository');
const axios = require('axios');
const { PRODUCT_SERVICE_URL } = require('../config/serverConfig')

class CartService{
    constructor() {
        this.cartRepository = new CartRepository();
    }

    // Recalculate total price
    calculateTotalPrice(cart) {
        return cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);  
    }

    async getProductDetails(productId) {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/v1/products/${productId}`);

            return response.data.data;
        } catch (error) {
            throw new Error('Product not found from Product Service');
        }
    }

    // Add to cart
    async addToCart(userId, product) {
        console.log(`User ${userId} adding product ${product.productId}`);

        if (!product.productId || !product.quantity) {
            throw new Error('Invalid product data');
        }

        if (product.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        const productData = await this.getProductDetails(product.productId);

        if (!productData) {
            throw new Error('Product does not exist');
        }

        // Stock Validation
        if (product.quantity > productData.stock) {
            throw new Error('Not enough stock available');
        }

        let cart = await this.cartRepository.getCartByUserId(userId);

        // create cart if not exist for user
        if (!cart) {
            cart = await this.cartRepository.createCart({
                userId,
                items: [
                    {
                        productId: product.productId,
                        quantity: product.quantity,
                        price: productData.price
                    }
                ],
                totalPrice: productData.price * product.quantity
            });
            return cart;
        }

        // check existing product
        const existingProduct = cart.items.find(
            item => item.productId.toString() === product.productId.toString()
        );

        if (existingProduct) {
            // ONLY update quantity
            existingProduct.quantity += product.quantity;
            existingProduct.price = productData.price;
        } else {
            // ➕ add new product
            cart.items.push({
                productId: product.productId,
                quantity: product.quantity,
                price: productData.price
            });
        }

        // recalculate total
        cart.totalPrice = this.calculateTotalPrice(cart);

        // save directly
        return await cart.save();
    }

    async getCartByUserId(userId) {
        return await this.cartRepository.getCartByUserId(userId);
    }

    async clearCart(userId) {
        return await this.cartRepository.clearCart(userId);
    }

    async updateCart(userId, productId, quantity) {
        const cart = await this.cartRepository.getCartByUserId(userId);

        if (!cart) {
            throw new Error('Cart not found');
        }

        // find item
        const item = cart.items.find(
            item => item.productId.toString() === productId.toString()
        );

        if (!item) {
            throw new Error('Item not found in cart');
        }

        // update quantity
        item.quantity = quantity;

        // remove item if quantity = 0
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.productId.toString() !== productId.toString()
            );
        }

        // recalculate total
        cart.totalPrice = this.calculateTotalPrice(cart);

        return await cart.save();
    }

}

module.exports = CartService;
