const express = require('express');
const Authentication = require('../../middleware/cart-middleware');

const router = express.Router();

const CartController = require('../../controller/cart-controller');
const cartController = new CartController();

router.post('/', Authentication, cartController.addToCart.bind(cartController));
router.get('/:id', Authentication, cartController.getCart.bind(cartController));
router.get('/', Authentication, cartController.getAllCarts.bind(cartController));
router.patch('/:productId', Authentication, cartController.updateCart.bind(cartController));
router.delete('/', Authentication, cartController.clearCart.bind(cartController));

module.exports = router;
