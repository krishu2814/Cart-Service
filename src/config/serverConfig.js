require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5010,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5009',
  INVENTORY_SERVICE_URL: process.env.INVENTORY_SERVICE_URL || 'http://localhost:5016',
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'ecommerce_events',
};
