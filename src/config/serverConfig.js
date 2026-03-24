require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL,
}
