# 🛒 Cart Service (Microservice)

A scalable and secure **Cart Management Service** built using **Node.js, Express.js, MongoDB, JWT Authentication, and Microservices Architecture**.

This service is responsible for managing customer shopping carts, validating products through the Product Service, maintaining cart totals, and supporting seamless integration with the Order and Payment workflows.

---

# 🚀 Features

### 🛒 Cart Management

* ➕ Add Products to Cart
* 📄 Retrieve User Cart
* ✏️ Update Product Quantity
* ❌ Remove Products from Cart
* 🗑️ Clear Entire Cart
* 💰 Automatic Total Price Calculation

### 🔐 Security

* JWT Authentication
* Protected Cart APIs
* User-Specific Cart Access
* API Gateway Integration

### 🔄 Microservices Communication

* Product Validation via Product Service
* Inventory Availability Checks
* Secure Service-to-Service Communication
* Authorization Token Forwarding

### 📦 Business Logic

* One Cart Per User
* Dynamic Price Calculation
* Stock Validation Before Adding Products
* Automatic Cart Cleanup After Successful Payment

---

# 🏗️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Security

* JWT Authentication
* Middleware-Based Authorization

### Architecture

* Microservices Architecture
* API Gateway Pattern
* Repository Pattern
* Service Layer Pattern

### Tools

* Postman
* MongoDB Compass
* Git
* GitHub

---

# 📂 Project Structure

```text
cart-service/

├── src/
│
├── controller/
│   └── cart-controller.js
│
├── routes/
│   └── v1/
│       └── cart-routes.js
│
├── middleware/
│   └── cart-middleware.js
│
├── service/
│   └── cart-service.js
│
├── repository/
│   └── cart-repository.js
│
├── model/
│   └── cart-model.js
│
├── config/
│
└── index.js

├── package.json
├── .env
└── README.md
```

---

# ⚙️ Service API Endpoints

These are the routes handled directly by the Cart Service.

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| POST   | `/`           | Add Product to Cart     |
| GET    | `/`           | Get User Cart           |
| PATCH  | `/:productId` | Update Product Quantity |
| DELETE | `/`           | Clear Entire Cart       |

---

# 🚪 API Gateway Routes

The Cart Service is exposed through the API Gateway.

| Method | Gateway Endpoint   | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/cart`            | Add Product to Cart     |
| GET    | `/cart`            | Get User Cart           |
| PATCH  | `/cart/:productId` | Update Product Quantity |
| DELETE | `/cart`            | Clear Entire Cart       |

---

# 🔐 Authentication

All Cart APIs are protected using JWT Authentication.

Example Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Authentication Flow:

1. User logs in through Auth Service.
2. JWT token is generated.
3. API Gateway validates token.
4. User information is forwarded to Cart Service.
5. Cart operations are performed securely.

---

# 🔄 Service Communication

### Product Service Integration

Before adding a product to the cart:

* Product existence is verified.
* Latest price is fetched.
* Available stock is checked.
* Authorization token is forwarded for secure access.

Example Flow:

```text
Client
  │
  ▼
API Gateway
  │
  ▼
Cart Service
  │
  ▼
Product Service
```

---

# 🧠 Cart Data Model

```javascript
{
  userId: String,

  items: [
    {
      productId: ObjectId,
      quantity: Number,
      price: Number
    }
  ],

  totalPrice: Number
}
```

---

# ⚡ Core Business Logic

### Add Product to Cart

1. Authenticate User
2. Validate Product ID
3. Fetch Product Details from Product Service
4. Verify Stock Availability
5. Create Cart if Not Exists
6. Add Product or Update Quantity
7. Recalculate Total Price
8. Save Updated Cart

---

### Update Cart

1. Find User Cart
2. Locate Product
3. Update Quantity
4. Remove Product if Quantity ≤ 0
5. Recalculate Total
6. Save Changes

---

### Clear Cart

1. Find User Cart
2. Delete Cart
3. Return Success Response

---

# 🌐 Role in Microservices Architecture

The Cart Service acts as the bridge between Product Discovery and Order Creation.

### Current Services

* ✅ Auth Service
* ✅ Product Service
* ✅ Cart Service
* ✅ Order Service
* ✅ Payment Service
* ✅ API Gateway

### User Purchase Flow

```text
Client
   │
   ▼
API Gateway
   │
   ▼
Auth Service
   │
   ▼
Product Service
   │
   ▼
Cart Service
   │
   ▼
Order Service
   │
   ▼
Payment Service
```

---

# 🛠️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/cart-service.git

cd cart-service
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5010

MONGO_URI=your_mongodb_connection_string

PRODUCT_SERVICE_URL=http://localhost:5009

AUTH_SERVICE_URL=http://localhost:5001
```

---

## Start Service

```bash
npm start
```

---

# 🧪 API Testing

You can test APIs using:

* Postman
* Thunder Client
* MongoDB Atlas
* MongoDB Compass

---

# 🧪 Best Practices Implemented

* ✅ RESTful API Design
* ✅ MVC Architecture
* ✅ Repository Pattern
* ✅ Service Layer Pattern
* ✅ Separation of Concerns
* ✅ JWT Authentication
* ✅ Input Validation
* ✅ Error Handling
* ✅ Secure Inter-Service Communication
* ✅ API Gateway Routing
* ✅ Clean and Maintainable Code

---

# 📈 Future Enhancements

### ⚡ Performance & Scalability

* Redis Caching for Frequently Accessed Carts
* Query Optimization & Database Indexing
* Distributed Caching Layer
* Read Replica Support for High Traffic

---

### 📨 Event-Driven Architecture

* RabbitMQ Integration
* Kafka-Based Event Streaming
* Cart Expiration Events
* Inventory Reservation Events
* Decoupled Service Communication

---

### 🛍️ Advanced E-Commerce Features

* Coupon & Discount System
* Wishlist Service
* Save for Later Feature
* Personalized Product Recommendations
* Inventory Reservation System

---

### 💳 Checkout Integration

* Direct Checkout from Cart
* One-Click Purchase
* Payment Session Creation
* Cart Locking During Checkout
---


### 🤖 AI Features

* Smart Cart Suggestions
* Frequently Bought Together
* Customer Behavior Analytics
* Dynamic Promotions

---

# 💼 What This Project Demonstrates

* Backend Engineering Skills
* Microservices Architecture Design
* Secure API Development
* Service-to-Service Communication
* Database Modeling
* JWT Authentication
* API Gateway Integration
* Real-World E-Commerce Workflows
* Scalable System Design

---

# 👨‍💻 Author

**Krishu Kumar**

📧 Email: [krishukumarsingh06@gmail.com](mailto:krishukumarsingh06@gmail.com)

🐙 GitHub: https://github.com/krishu2814

