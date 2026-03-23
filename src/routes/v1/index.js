const express = require('express');
const Authentication = require('../../middleware/cart-middleware');

const router = express.Router();

const CartController = require('../../controller/cart-controller');
const cartController = new CartController();

router.post('/cart', Authentication, cartController.addToCart.bind(cartController));

module.exports = router;
