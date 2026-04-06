# 🛒 Cart Service (Microservice)

A scalable and secure **Cart Management Service** built using **Node.js, Express, and MongoDB**, designed as part of a **microservices-based e-commerce platform**.

This service handles **user cart operations**, including adding items, updating quantities, retrieving cart details, and clearing the cart — with proper authentication.

---

## 🚀 Features

* ➕ Add Product to Cart
* 📄 Get User Cart
* ✏️ Update Product Quantity in Cart
* ❌ Clear Entire Cart
* 🔐 Protected Routes (Authentication Middleware)
* 💰 Automatic Total Price Calculation
* 📦 Persistent Cart Storage

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** Middleware-based (JWT assumed)
* **Architecture:** Microservices
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```id="f92kls"
cart-service/
│
├── src/
│   ├── controller/
│   │   └── cart-controller.js
│   ├── routes/
│   │   └── v1/
│   │       └── cart-routes.js
│   ├── models/
│   │   └── cart-model.js
│   ├── middleware/
│   │   └── cart-middleware.js
│   ├── services/
│   ├── repository/
│   └── config/
│
├── package.json
├── .env
└── README.md
```

---

## ⚙️ API Endpoints

### 🛒 Cart APIs (Protected)

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/cart`            | Add item to cart     |
| GET    | `/cart`            | Get user cart        |
| PATCH  | `/cart/:productId` | Update item quantity |
| DELETE | `/cart`            | Clear entire cart    |

---

## 🔐 Authentication

All routes are protected using middleware:

```js id="k92sld"
router.use(Authentication);
```

* Requires valid JWT token
* Ensures only authenticated users can access their cart

---

## 🧠 Data Model

```js id="p29slx"
{
  userId: String,   // unique user identifier

  items: [
    {
      productId: ObjectId,
      quantity: Number,
      price: Number
    }
  ],

  totalPrice: Number // auto-calculated
}
```

---

## ⚡ Core Logic

* Each user has **one cart (unique userId)**
* Items are stored as an array
* Total price is dynamically updated:

  * Add item → increase total
  * Update quantity → recalculate
  * Remove/clear → reset total

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash id="k92lsl"
git clone https://github.com/your-username/cart-service.git
cd cart-service
```

### 2️⃣ Install Dependencies

```bash id="l82kls"
npm install
```

### 3️⃣ Environment Variables

Create `.env` file:

```id="m92lsl"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run Server

```bash id="z82lsl"
npm start
```

---

## 🧪 API Testing

Use tools like:

* Postman
* Thunder Client
* Mongodb Atlas
* Mongodb Compass

---

## 📈 Future Enhancements

* 🛍️ Integration with Product Service (price validation)
* ⚡ Redis Caching for faster cart retrieval
* 🧠 Smart Cart (recommendations)
* 🧾 Coupon & Discount System
* 🔄 Event-driven updates (Kafka / RabbitMQ)
* 💳 Checkout Integration

---

## 🌐 Role in Microservices Architecture

This service is part of:

* Product Service ✅
* User Service ✅
* Cart Service ✅
* Order Service ✅
* Payment Service 🚧
* API Gateway 🚧

---

## 🔄 Service Communication (Planned)

* REST APIs
* Event-driven architecture
* API Gateway routing

---

## 🧪 Best Practices Followed

* ✅ RESTful API Design
* ✅ Middleware-based Authentication
* ✅ MVC Architecture
* ✅ Clean Code Principles
* ✅ Data Validation
* ✅ Scalable Schema Design

---

## 💼 Why This Project?

This project demonstrates:

* Real-world backend development
* Secure API design
* Microservices architecture understanding
* Data consistency handling
* Scalable cart system design

---

## 🤝 Contributing

```bash id="p92lsl"
# Fork the repository
git checkout -b feature/NewFeature

# Commit changes
git commit -m "Add feature"

# Push changes
git push origin feature/NewFeature
```

---

## 📬 Contact

**Krishu Kumar**  
📧 Email: [krishukumarsingh06@gmail.com](mailto:krishukumarsingh06@gmail.com)  
🐙 GitHub: https://github.com/krishu2814
