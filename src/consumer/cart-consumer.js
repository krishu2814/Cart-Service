const { getChannel, EXCHANGE_NAME } = require("../config/rabbitmq");
const CartService = require("../service/cart-service");

const QUEUE_NAME = "cart_order_confirmed_queue";
const ROUTING_KEY = "ORDER_CONFIRMED";

const cartConsumer = async () => {
  const channel = getChannel();
  const cartService = new CartService();
  await channel.assertExchange(EXCHANGE_NAME, "topic", {
    durable: true,
  });
  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  await channel.prefetch(1);

  console.log(
    `Consumer listening on ${QUEUE_NAME} with routing key ${ROUTING_KEY}`,
  );

  await channel.consume(
    QUEUE_NAME,
    async (message) => {
      if (!message) {
        return;
      }

      try {
        const event = JSON.parse(message.content.toString());
        // console.log(`Received ${ROUTING_KEY}:`, event.orderId);
        if (
          event.event !== "ORDER_CONFIRMED" ||
          !event.orderId ||
          !event.userId
        ) {
          console.error("Invalid ORDER_CONFIRMED event:", event);
          channel.ack(message);
          return;
        }
        const userId = String(event.userId);

        // console.log(
        //   `Clearing cart for user ${userId} after order ${event.orderId}`,
        // );

        const clearedCart = await cartService.clearCart(userId);
        if (!clearedCart) {
          console.log(`No cart found for user ${userId}. Nothing to clear.`);
        } else {
          console.log(`Cart cleared successfully for user ${userId}`);
        }

        channel.ack(message);
      } catch (error) {
        console.error("ORDER_CONFIRMED cart processing failed:", error.message);

        channel.nack(message, false, false);
      }
    },
    {
      noAck: false,
    },
  );
};

module.exports = cartConsumer;
