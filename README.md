# Task Management Application

A full-stack MEAN (MongoDB, Express, Angular, Node.js) application for managing tasks with user authentication.

## Features

- User authentication (register, login) with JWT
- Task management (create, read, update, delete)
- Task filtering by status (pending, in-progress, completed)
- Responsive UI design
- Form validation
- Secure API endpoints

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
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
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

3. Start the Angular development server:
```bash
ng serve
```

The frontend application will run on http://localhost:4200

## Docker Deployment

### Local Docker Deployment

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

### AWS Deployment

#### Prerequisites for AWS Deployment
- AWS account
- AWS CLI configured
- Basic knowledge of AWS services (EC2, ECR)

#### Deploying to AWS EC2 with Docker

1. Create an EC2 instance with Amazon Linux 2:
   - Choose an appropriate instance type (t2.micro for testing)
   - Configure security group to allow inbound traffic on ports 22 (SSH), 80 (HTTP), and 5000 (API)
   - Create and download a key pair for SSH access

2. Install Docker and Docker Compose on the EC2 instance:
```bash
ssh -i your-key.pem ec2-user@your-ec2-instance-ip

# Install Docker
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chkconfig docker on

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in for changes to take effect
exit
```

3. Copy the project files to the EC2 instance:
```bash
scp -i your-key.pem -r task-management-app ec2-user@your-ec2-instance-ip:~
```

4. SSH into the EC2 instance and start the application:
```bash
ssh -i your-key.pem ec2-user@your-ec2-instance-ip
cd task-management-app

# Update the environment variables in docker-compose.yml if needed
# Start the application
docker-compose up -d
```

5. Access your application:
   - Frontend: http://your-ec2-instance-ip
   - Backend API: http://your-ec2-instance-ip:5000/api

#### Alternative: Using AWS Elastic Container Service (ECS)

For a more scalable and managed solution, you can use AWS ECS:

1. Create ECR repositories for your images:
```bash
aws ecr create-repository --repository-name task-management-frontend
aws ecr create-repository --repository-name task-management-backend
```

2. Build, tag and push your Docker images:
```bash
# Login to ECR
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-aws-account-id.dkr.ecr.your-region.amazonaws.com

# Build and push backend
cd backend
docker build -t your-aws-account-id.dkr.ecr.your-region.amazonaws.com/task-management-backend:latest .
docker push your-aws-account-id.dkr.ecr.your-region.amazonaws.com/task-management-backend:latest

# Build and push frontend
cd ../frontend/task-management-client
docker build -t your-aws-account-id.dkr.ecr.your-region.amazonaws.com/task-management-frontend:latest .
docker push your-aws-account-id.dkr.ecr.your-region.amazonaws.com/task-management-frontend:latest
```

3. Create an ECS cluster, task definitions, and services using the AWS Management Console or AWS CLI.

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

## License

This project is licensed under the MIT License.
