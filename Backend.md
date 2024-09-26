
# Backend (Node.js + Express + MySQL)

This is the backend API for managing user authentication and employee records. The API is built using **Node.js**, **Express.js**, and **MySQL**.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SANDY13061/EmployeeReactTask.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```bash
PORT=5000
JWT_SECRET=your_jwt_secret
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
```

### 4. Start the backend server

```bash
node app.js
```

The server will run at: `http://localhost:5000`.

## Folder Structure

```bash
backend/
│
├── controllers/             # Controller functions for handling routes
├── middleware/              # Middleware functions (e.g., authentication)
├── models/                  # MySQL database models
├── routes/                  # API routes (auth, employee, etc.)
├── config/                  # Database configuration
├── app.js                   # Main application file
├── package.json             # Project dependencies and scripts
└── README.md                # Project instructions
```

## API Documentation

### 1. User Authentication

#### Login API

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response**:
  - **Success**: Returns a JSON Web Token (JWT).
  - **Error**: Returns an error message if the credentials are invalid.

#### Register API

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response**: A success message confirming user registration.

### 2. Employee Management

#### Get All Employees

- **URL**: `/api/employees/all`
- **Method**: `GET`
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```
- **Response**: Returns a list of all employees.

#### Create Employee

- **URL**: `/api/employees/create`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Employee Name",
    "email": "employee@example.com",
    "mobile": "1234567890",
    "designation": "HR",
    "gender": "Male",
    "course": ["MCA"],
    "img": "employee_image.jpg"
  }
  ```
- **Response**: Returns the created employee details.

#### Edit Employee

- **URL**: `/api/employees/update/:id`
- **Method**: `PUT`
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```
- **Request Body**: Same as create employee.
- **Response**: Returns the updated employee details.

#### Delete Employee

- **URL**: `/api/employees/delete/:id`
- **Method**: `DELETE`
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```
- **Response**: Returns a success message confirming the deletion.

## Database Setup

1. **MySQL Configuration**: Ensure you have a running MySQL instance.Backend code automatically setup your database table 

