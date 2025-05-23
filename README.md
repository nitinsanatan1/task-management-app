# Task Management Application

A full-stack MEAN (MongoDB, Express, Angular, Node.js) application for managing tasks with user authentication.

## Demo

[Live Demo](https://task-management-frontend-vpsu.onrender.com)

> **Note:** The app may take a few moments to load due to cold starts on Render.com.

## Features

- User authentication (register, login) with JWT
- Task management (create, read, update, delete)
- Task filtering by status (pending, in-progress, completed)
- Responsive UI design
- Form validation
- Secure API endpoints with authentication & request validation
- Dockerized for easy deployment

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication with Passport
- Joi validation

### Frontend
- Angular 17
- TypeScript
- Bootstrap for styling
- Reactive Forms with validation
- JWT authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or MongoDB Atlas)
- [Angular CLI](https://angular.io/cli) (v17 or higher)
- [Docker](https://www.docker.com/products/docker-desktop) (for containerized deployment)

## Local Installation and Setup

### Clone the Repository

```bash
git clone <repository-url>
cd task-management-app
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGODB_URI={MONGODB_URI}
JWT_SECRET={JWT_SECRET}
JWT_EXPIRES_IN=7d
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the backend server:
```bash
npm start
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend/task-management-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the Angular development server with Node version 20.04:
```bash
npm run start
```

The frontend application will run on http://localhost:4200

## Docker Deployment

### Local Docker Compose (Development)

You can run both frontend and backend locally using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your machine.
2. Navigate to the root directory of the project:
```bash
cd task-management-app
```
3. Build and start the containers:
```bash
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:5000/api

### Production Deployment on Render.com

For production, the frontend and backend are deployed as separate Docker services on Render.com:

- Each service (frontend and backend) uses its own Dockerfile for deployment.
- Environment variables for each service are configured in the Render.com dashboard.
- The backend service exposes the API (e.g., https://your-backend-service.onrender.com/api)
- The frontend service serves the Angular app (e.g., https://your-frontend-service.onrender.com)
- Update the frontend environment or API base URL to point to the deployed backend API endpoint.

#### Deployment Steps (Render.com)

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Create two new Web Services on Render.com:
   - One for the backend (select the backend Dockerfile)
   - One for the frontend (select the frontend Dockerfile)
3. Set environment variables for each service as needed (e.g., MongoDB URI, JWT secret, etc.).
4. Deploy both services. Render.com will build and run each container separately.
5. Update your frontend's API endpoint to use the Render backend URL.

## API Documentation

### Authentication Endpoints

#### Register a new user
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "example",
      "email": "example@example.com"
    }
  }
  ```

#### Login user
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "example",
      "email": "example@example.com"
    }
  }
  ```

### Task Endpoints

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer jwt_token_here
```

#### Create a new task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "status": "pending"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "task": {
      "_id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "status": "pending",
      "user": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Get all tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "count": 1,
    "tasks": [
      {
        "_id": "task_id",
        "title": "Task title",
        "description": "Task description",
        "status": "pending",
        "user": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
  ```

#### Get tasks by status
- **URL**: `/api/tasks/status/:status`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "count": 1,
    "tasks": [
      {
        "_id": "task_id",
        "title": "Task title",
        "description": "Task description",
        "status": "pending",
        "user": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
  ```

#### Update a task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "task": {
      "_id": "task_id",
      "title": "Updated title",
      "description": "Updated description",
      "status": "completed",
      "user": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Delete a task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

## Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validation/
│   │   └── index.ts
│   ├── dist/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   └── task-management-client/
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/
│       │   │   ├── features/
│       │   │   ├── app.component.ts
│       │   │   └── ...
│       │   ├── assets/
│       │   └── ...
│       ├── package.json
│       ├── angular.json
│       └── Dockerfile
├── docker-compose.yml
└── README.md
```
