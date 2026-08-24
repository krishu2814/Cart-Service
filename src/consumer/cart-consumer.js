const { startConsumer } = require("./event-consumer");
const CartService = require("../service/cart-service");

const QUEUE_NAME = "cart_order_confirmed_queue";
const ROUTING_KEY = "ORDER_CONFIRMED";

const cartConsumer = async () => {
  const cartService = new CartService();

  await startConsumer(
    QUEUE_NAME,
    ROUTING_KEY,
    async (event) => {
      if (
        event.event !== "ORDER_CONFIRMED" ||
        !event.orderId ||
        !event.userId
      ) {
        console.error("Invalid ORDER_CONFIRMED event:", event);
        return;
      }

      const userId = String(event.userId);

      const clearedCart = await cartService.clearCart(userId);
      if (!clearedCart) {
        console.log(`No cart found for user ${userId}. Nothing to clear.`);
      } else {
        console.log(`Cart cleared successfully for user ${userId}`);
      }
    },
  );
};

module.exports = cartConsumer;
