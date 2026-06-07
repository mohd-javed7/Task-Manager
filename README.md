# Task Manager

A full-stack Task Management web application built with the MERN stack as part of an internship assignment. Users can register, log in, and manage their personal tasks with full CRUD functionality.

## Live Demo

https://taskmanager-javed.vercel.app

## Features

- User registration and login with JWT authentication
- Create, update, delete, and view tasks
- Mark tasks as completed or pending
- Filter tasks by status (All, Pending, Completed)
- Responsive UI for mobile and desktop
- Protected routes — tasks are private to each user

## Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Authentication:** JSON Web Tokens (JWT), bcryptjs

## Project Structure
Task-Manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── task.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
└── frontend/
└── src/
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── About.jsx
└── App.jsx

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
VITE_API_URL=http://localhost:5000

Start the frontend:

```bash
npm run dev
```

### Access the app

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get token | No |
| GET | /api/task | Get all tasks | Yes |
| POST | /api/task | Create a new task | Yes |
| PUT | /api/task/:id | Update a task | Yes |
| DELETE | /api/task/:id | Delete a task | Yes |
| PATCH | /api/task/:id | Toggle task status | Yes |

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas
