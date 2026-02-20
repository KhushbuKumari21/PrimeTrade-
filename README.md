# PrimeTrade Assignment

## 📌 Project Overview

This project is a scalable REST API with secure authentication and role-based access control, along with a basic React frontend to demonstrate API functionality.

It follows production-level backend practices including JWT authentication, password hashing, secure CRUD operations, API versioning, Swagger documentation, and modular scalable architecture.

---

## 🛠 Tech Stack

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Swagger

Frontend:

- React.js
- Axios
- CSS

---

## 📂 Project Structure

prime-assignment

backend  
│  
├── config  
│ └── db.js  
│  
├── middleware  
│ ├── auth.js  
│ └── role.js  
│  
├── models  
│ ├── User.js  
│ └── Task.js  
│  
├── routes  
│ ├── authRoutes.js  
│ └── taskRoutes.js  
│  
├── .env  
├── server.js

frontend  
│  
├── src  
│ ├── App.jsx  
│ └── App.css

├── main.jsx

README.md

## 📸 Screenshots Output

D:\prime-assignment\Output
D:\prime-assignment\Output\Add Task.jpg
D:\prime-assignment\Output\register.jpg
D:\prime-assignment\Output\login.jpg
D:\prime-assignment\Output\Get Task.jpg
D:\prime-assignment\Output\swagger.jpg
D:\prime-assignment\Output\frontend Home Page.jpg
D:\prime-assignment\Output\Frontend Add Task.jpg
D:\prime-assignment\Output\Delete Particular id.jpg
D:\prime-assignment\Output\put for update.jpg

---

## ⚙️ Installation & Setup

Clone repository:

git clone https://github.com/KhushbuKumari21/PrimeTrade-

cd prime-assignment

---

# Backend Setup and Run:

cd backend  
npm install  
npm start

Backend runs on:

http://localhost:5000

---

# Frontend Setup and Run:

cd frontend  
npm install  
npm run dev

Frontend runs on:

http://localhost:5173

---

## 🔐 Authentication

JWT-based authentication is implemented.

Authorization header format:

Authorization: Bearer TOKEN

---

## 📌 API Endpoints

Auth APIs:

POST /api/v1/auth/register → Register user  
POST /api/v1/auth/login → Login user

Task APIs:

GET /api/v1/tasks → Get tasks  
POST /api/v1/tasks → Create task  
PUT /api/v1/tasks/:id → Update task  
DELETE /api/v1/tasks/:id → Delete task

---

## 📖 API Documentation

Swagger documentation available at:

http://localhost:5000/api-docs

---

## 🔒 Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Role-based access
- Ownership validation
- Input validation

---

## ⚡ Scalability Approach

This project is scalable and production-ready.

Scalability features:

- Modular structure
- Stateless JWT authentication
- Easy to extend

Future improvements possible:

- Redis caching
- Docker deployment
- Load balancing
- Microservices

---

## 🧪 Testing

Frontend UI supports:

- User registration
- Login
- Task creation
- Task deletion
- Secure dashboard access

---

## 👩‍💻 Author

Khushbu Kumari

Backend Developer Intern Assignment

# Github Link :
