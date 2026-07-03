const amqp = require('amqplib');
const { RABBITMQ_URL } = require('./serverConfig');

let channel;
let connection;

const connectRabbitMQ = async () => {
    try {
        // 1. Connect to RabbitMQ server
        connection = await amqp.connect(RABBITMQ_URL);
        // console.log('Connected to RabbitMQ server', RABBITMQ_URL);
        // 2. Create a channel
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    }
    catch (error) {
        throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
    }
};

const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized. Please call connectRabbitMQ() first.');
    }
    return channel;
}

module.exports = {
    connectRabbitMQ,
    getChannel
};
