const { startConsumer } = require('./event-consumer');
const CartRepository = require('../repository/cart-repository');

const cartRepository = new CartRepository();

const cartConsumer = async () => {

    await startConsumer('ORDER_CONFIRMED', async (data) => {

        // console.log('ORDER_CONFIRMED received:', data);

        await cartRepository.clearCart(data.userId);

        // console.log(`Cart cleared for user ${data.userId}`);

    });

};

module.exports = cartConsumer;
