const CartRepository = require('../repository/cart-repository');

class CartService{
    constructor() {
        this.cartRepository = new CartRepository();
    }

    // Add to cart
    async addToCart(userId, product) {
        let cart = await this.cartRepository.getCartByUserId(userId);

        // create cart if not exist for user
        if (!cart) {
            cart = await this.cartRepository.createCart({
                userId,
                items: [
                    {
                        productId: product.productId,
                        quantity: product.quantity,
                        price: product.price
                    }
                ],
                totalPrice: product.price * product.quantity
            });
            return cart;
        }

        // check existing product
        const existingProduct = cart.items.find(
            item => item.productId.toString() === product.productId
        );

        if (existingProduct) {
            // ONLY update quantity
            existingProduct.quantity += product.quantity;
        } else {
            // ➕ add new product
            cart.items.push({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price
            });
        }

        // recalculate total
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // save directly
        return await cart.save();
    }


}

module.exports = CartService;
