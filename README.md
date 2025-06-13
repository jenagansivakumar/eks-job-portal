
# EmployEye Job Portal

## Overview
EmployEye is a full-stack job portal application where users can sign up, log in, and interact with a platform that facilitates job postings and applications. This project is built with a **React** frontend, a **Node.js** backend (including some services in **Go**), and a **PostgreSQL** database via **Prisma**.

## Features
- **Authentication**: User signup and login with JWT-based authentication.
- **Job Listings**: Create, update, fetch, and delete job listings.
- **Users** Create/Login users w/ usernames, passwords, email.
- **Protected Routes**: Certain features are accessible only to logged-in users.

## Tech Stack
### Frontend
- **React** with **Vite**
- **Axios** for HTTP requests
- **ShadCN** for UI components

### Backend
- **Node.js** with **Express**
- **Prisma** ORM for database interactions
- **bcryptjs** for password hashing
- **JWT** for user authentication

### Database
- **PostgreSQL**

### DevOps
- Dockerised frontend, backend, and database with **Docker Compose**
- CI/CD pipeline configured using **GitHub Actions**

## Installation
### Prerequisites
- Node.js (v20)
- Docker and Docker Compose

### Clone the Repository
```bash
git clone https://github.com/jenagansivakumar/eks-job-portal.git
cd employeye-job-portal
```

### Local Development Setup
1. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
2. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
3. Create `.env` files for both `frontend` and `backend` services.

#### Backend `.env` Example:
```env
DATABASE_URL=postgresql://postgres:password@db:5432/usersdb
JWT_SECRET=z2VmXjKOey6ZkH9pgOeOPRxn5duIyXNvkx-G4JmtXnC-dLrE9zHUJS_4xsd0bOYPAgLCAPlm_KWxINPL8uJrMw
```

### Run the App with Docker Compose
```bash
docker compose up --build
```
Access the app at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

## CI/CD Pipeline
The project includes a **GitHub Actions** workflow to:
- Build the backend.
- Build the frontend.


## Troubleshooting
- **Frontend Not Loading**: Ensure the backend is running and `DATABASE_URL` is correctly configured.
- **Database Errors**: Verify that PostgreSQL is running and accessible on `localhost:5432`.

## Future Improvements
- Add role-based access control for admin users.
- Tests
- Better UI
- Implement user notifications.
- Optimise CI/CD pipeline for production deployment.
- Configure backend to serve React app for unknown routes.
