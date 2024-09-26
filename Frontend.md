
# Frontend (React)

This is the frontend for the employee management system built using **React.js**. The frontend communicates with the backend API for user authentication and employee management.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
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
│   ├── components/          # React components (Login, Dashboard, etc.)
│   ├── App.js               # Main application file with routing
│   ├── index.js             # Entry point for React app
│   ├── styles/              # Global or component-specific CSS files
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
