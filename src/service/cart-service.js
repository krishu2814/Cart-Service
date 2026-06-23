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

    async getProductDetails(productId, token) {
        try {
            console.log("Calling Product Service...");
            console.log("URL:", `${PRODUCT_SERVICE_URL}/api/v1/${productId}`);
            console.log("Token:", token);
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/v1/${productId}`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("Product Service Response:", response.data);

            return response.data.data;
        } catch (error) {
            console.log("========== PRODUCT SERVICE ERROR ==========");
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log("Message:", error.message);

            throw error;
        }
        
    }

    // Add to cart
    async addToCart(userId, product, token) {
        // console.log(`User ${userId} adding product ${product.productId}`);

        if (!product.productId || !product.quantity) {
            throw new Error('Invalid product data');
        }

        if (product.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        const productData = await this.getProductDetails(product.productId, token);
        console.log("Product data from Product Service:", productData);

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

    async getAllCarts() {
        return await this.cartRepository.getAllCarts();
    }

}

module.exports = CartService;
