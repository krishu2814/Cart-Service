const { getChannel, EXCHANGE_NAME } = require("../config/rabbitmq");

const startConsumer = async (queueName, routingKey, handler) => {
  const channel = getChannel();

  await channel.assertExchange(EXCHANGE_NAME, "topic", {
    durable: true,
  });

  await channel.assertQueue(queueName, {
    durable: true,
  });

  await channel.bindQueue(queueName, EXCHANGE_NAME, routingKey);

  await channel.prefetch(1);

  console.log(`Listening on ${queueName}`);
  console.log(`Routing key: ${routingKey}`);

  await channel.consume(
    queueName,
    async (message) => {
      if (!message) return;

      try {
        const data = JSON.parse(message.content.toString());

        await handler(data);

        channel.ack(message);

        console.log(`${routingKey} processed successfully`);
      } catch (error) {
        console.error(`${routingKey} processing failed:`, error.message);

        channel.nack(message, false, false);
      }
    },
    {
      noAck: false,
    },
  );
};

module.exports = {
  startConsumer,
};
