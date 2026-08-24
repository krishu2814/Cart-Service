const express = require('express');
const Authentication = require('../../middleware/cart-middleware');

const router = express.Router();

const CartController = require('../../controller/cart-controller');
const cartController = new CartController();

router.post('/', Authentication, cartController.addToCart.bind(cartController));
router.get('/', Authentication, cartController.getCart.bind(cartController));
router.get('/all', Authentication, cartController.getAllCarts.bind(cartController));
router.get('/cart', Authentication, cartController.getCart.bind(cartController));
router.patch('/:productId', Authentication, cartController.updateCart.bind(cartController));
router.delete('/:productId', Authentication, cartController.removeItem.bind(cartController));
router.delete('/', Authentication, cartController.clearCart.bind(cartController));

module.exports = router;
