# 🛒 Cart Service (Microservices Architecture)

A scalable **Cart Service** built using **Node.js, Express, MongoDB**, designed as part of a **microservices-based shopping application**.  
Handles cart operations with secure authentication using **JWT** and follows a clean architecture.

---

## 🚀 Features

- ➕ Add products to cart
- 🔄 Update product quantity in cart
- ❌ Remove items / Clear cart
- 📦 Get user cart details
- 🔐 Secure APIs using JWT Authentication
- 🧠 Automatic total price calculation
- 🏗️ Clean architecture (Controller → Service → Repository)
- ⚡ Microservice-ready design

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (jsonwebtoken)  
- **Security:** Middleware-based authentication  
- **Environment:** dotenv  

---

## 📁 Project Structure

src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middleware/
├── config/
└── index.js


---

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/cart-service.git
cd cart-service

### Install dependencies
`npm install`

### Setup environment variables
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PRODUCT_SERVICE_URL=http://localhost:5009

### Run the server
npm start
