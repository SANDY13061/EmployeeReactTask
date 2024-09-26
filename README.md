
# Frontend (React)

This is the frontend for the employee management system built using **React.js**. The frontend communicates with the backend API for user authentication and employee management.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SANDY13061/EmployeeReactTask.git
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend server

```bash
npm start
```

The app will be running at: `http://localhost:3000`.

## Folder Structure

```bash
frontend/
│
├── public/                  # Public assets
├── src/                     # Source code
├── package.json             # Project dependencies and scripts
└── README.md                # Project instructions
```

## Available Scripts

- `npm start` – Starts the development server.
- `npm run build` – Builds the app for production.

## Login API Integration

The login form in the frontend calls the following backend API:

- **URL**: `http://localhost:5000/api/auth/login`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response**:
  - On success, it returns a JSON Web Token (JWT) which is stored in localStorage for subsequent authenticated requests.

## Routing

- **Login Page**: `http://localhost:3000/login`
- **Protected Dashboard**: Only accessible if authenticated (valid JWT present in `localStorage`).

## Logout

To log out, the token is removed from local storage, and the user is redirected to the login page.

## Protected Routes

The frontend uses a `PrivateRoute` wrapper to protect routes like the Dashboard. If a user is not authenticated (i.e., no JWT token found), they will be redirected to the login page.

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

