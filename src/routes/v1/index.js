const express = require('express');
const Authentication = require('../../middleware/cart-middleware');

const router = express.Router();

const CartController = require('../../controller/cart-controller');
const cartController = new CartController();

router.post('/cart', Authentication, cartController.addToCart.bind(cartController));
router.get('/cart', Authentication, cartController.getCart.bind(cartController));
router.patch('/cart/:productId', Authentication, cartController.updateCart.bind(cartController));
router.delete('/cart', Authentication, cartController.clearCart.bind(cartController));

module.exports = router;
