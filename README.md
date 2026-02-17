# Expense Tracker Backend

RESTful API for expense tracking application with JWT authentication.

## Features

- User authentication (Register/Login)
- JWT-based authorization
- CRUD operations for transactions
- User-specific data isolation
- MongoDB integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- Bcrypt for password hashing
- CORS enabled

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3001
mongourl=mongodb://localhost:27017/expenseTracker
JWT_SECRET=your-secret-key-here
```

## Run

```bash
npm start
```

Server runs on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions (Protected)
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary` - Get financial summary

## Request Examples

### Register
```json
POST /api/auth/register
{
  "username": "john",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "username": "john",
  "password": "password123"
}
```

### Add Transaction
```json
POST /api/transactions
Headers: { "Authorization": "Bearer <token>" }
{
  "type": "income",
  "title": "Salary",
  "amount": 5000
}
```

## Security

- Passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- Protected routes require valid JWT token
- User data is isolated per user
