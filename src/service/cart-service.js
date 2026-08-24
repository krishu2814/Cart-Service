const CartRepository = require('../repository/cart-repository');
const axios = require('axios');
const { PRODUCT_SERVICE_URL, INVENTORY_SERVICE_URL } = require('../config/serverConfig');

class CartService {
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
            const config = {
                timeout: 5000
            };
            if (token) {
                config.headers = { 'Authorization': token };
            }

            const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/v1/${productId}`, config);
            return response.data?.data;
        } catch (error) {
            console.error(`Product Service Error for ID ${productId}:`, error.response?.data || error.message);
            if (error.response?.status === 404) {
                return null;
            }
            throw new Error('Failed to retrieve product details');
        }
    }

    async checkAvailableStock(productId) {
        try {
            const response = await axios.get(`${INVENTORY_SERVICE_URL}/api/v1/inventory/${productId}`, {
                timeout: 3000
            });
            const inventory = response.data?.data;
            if (inventory && typeof inventory.availableQuantity === 'number') {
                return inventory.availableQuantity;
            }
            return null;
        } catch (error) {
            // If inventory not found (404) or inventory service is down, return null so checkout saga handles reservation
            return null;
        }
    }

    // Add to cart
    async addToCart(userId, product, token) {
        if (!product.productId) {
            throw new Error('Product ID is required');
        }

        const quantity = Number(product.quantity);
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive integer');
        }

        const productData = await this.getProductDetails(product.productId, token);
        if (!productData) {
            throw new Error('Product does not exist');
        }

        // Check existing cart
        let cart = await this.cartRepository.getCartByUserId(userId);
        const existingItem = cart?.items?.find(
            item => item.productId.toString() === product.productId.toString()
        );
        const newTotalQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

        // Stock Validation against Inventory Service
        const availableStock = await this.checkAvailableStock(product.productId);
        if (availableStock !== null && newTotalQuantity > availableStock) {
            throw new Error(`Not enough stock available. Only ${availableStock} item(s) left in stock.`);
        }

        const itemImage = Array.isArray(productData.images) && productData.images.length > 0
            ? productData.images[0]
            : (productData.image || '');

        // Create cart if not exist for user
        if (!cart) {
            cart = await this.cartRepository.createCart({
                userId,
                items: [
                    {
                        productId: product.productId,
                        name: productData.name,
                        image: itemImage,
                        quantity: quantity,
                        price: productData.price
                    }
                ],
                totalPrice: productData.price * quantity
            });
            return cart;
        }

        if (existingItem) {
            // Update quantity, price, and metadata
            existingItem.quantity += quantity;
            existingItem.price = productData.price;
            existingItem.name = productData.name || existingItem.name;
            existingItem.image = itemImage || existingItem.image;
        } else {
            // Add new product item
            cart.items.push({
                productId: product.productId,
                name: productData.name,
                image: itemImage,
                quantity: quantity,
                price: productData.price
            });
        }

        // Recalculate total
        cart.totalPrice = this.calculateTotalPrice(cart);

        return await cart.save();
    }

    async getCartByUserId(userId) {
        let cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            cart = await this.cartRepository.createCart({
                userId,
                items: [],
                totalPrice: 0
            });
        }
        return cart;
    }

    async clearCart(userId) {
        return await this.cartRepository.clearCart(userId);
    }

    async updateCart(userId, productId, quantity) {
        const qty = Number(quantity);
        if (!Number.isInteger(qty) || qty < 0) {
            throw new Error('Quantity must be a non-negative integer');
        }

        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        // Find item
        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        if (qty === 0) {
            // Remove item
            cart.items.splice(itemIndex, 1);
        } else {
            // Validate stock if possible
            const availableStock = await this.checkAvailableStock(productId);
            if (availableStock !== null && qty > availableStock) {
                throw new Error(`Cannot update quantity. Only ${availableStock} item(s) available.`);
            }
            cart.items[itemIndex].quantity = qty;
        }

        // Recalculate total
        cart.totalPrice = this.calculateTotalPrice(cart);

        return await cart.save();
    }

    async removeItem(userId, productId) {
        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const initialCount = cart.items.length;
        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId.toString()
        );

        if (cart.items.length === initialCount) {
            throw new Error('Item not found in cart');
        }

        cart.totalPrice = this.calculateTotalPrice(cart);
        return await cart.save();
    }

    async getAllCarts() {
        return await this.cartRepository.getAllCarts();
    }
}

module.exports = CartService;
