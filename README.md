# Pricing Engine Service

## 📌 Project Overview

This is a backend service built with **TypeScript, Express.js, and PostgreSQL** that calculates custom quotes for customers based on configurable rules and conditions.

## 🚀 Features

- Retrieve product details including base price and associated rules.
- Calculate final quotes based on customer data.
- Create new products with pricing rules.
- Uses PostgreSQL as the database.

---

## 🛠️ Tech Stack

- **Backend:** TypeScript, Express.js
- **Database:** PostgreSQL
- **ORM:** TypeORM&#x20;
- **API Testing:** Postman

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/blacksoxx/pricing-engine-express.git
cd pricing-engine-express
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```
DATABASE_HOST=your_db_host
DATABASE_PORT=your_db_port
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
```

Modify these values according to your setup.

### 4️⃣ Start the Server

```sh
npm run start
```

Server should now be running at `http://localhost:3000`

---

## 📌 API Endpoints

### 🔹 Get Product Details

**GET** `/products/:productId`

### 🔹 Calculate Final Quote

**POST** `/products/:productId/calculate`

#### Example Request Body:

```json
{
  "age": 28,
  "income": 55000,
  "hasPreviousClaims": false
}
```

### 🔹 Create New Product

**POST** `/products`

#### Example Request Body:

```json
{
  "basePrice": 100,
  "rules": [
    {
      "condition": { "field": "age", "operator": ">", "value": 25 },
      "operation": { "type": "increase", "amount": 10 }
    }
  ]
}
```

---

## 🔍 Testing the API

Postman Collection:

[https://documenter.getpostman.com/view/41800921/2sAYXCmKcq](https://documenter.getpostman.com/view/41800921/2sAYXCmKcq)
