const amqp = require("amqplib");
const { RABBITMQ_URL } = require("./serverConfig");

let channel;
let connection;

const EXCHANGE_NAME = "ecommerce_events";

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "topic", {
      durable: true,
    });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized. Please call connectRabbitMQ() first.",
    );
  }
  return channel;
};

module.exports = {
  connectRabbitMQ,
  getChannel,
  EXCHANGE_NAME,
};
