import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import EmployeeList from './EmployeeList'; // Assuming EmployeeList is your dashboard
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute
import DashboardHome from './Home';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect root path to /login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Public route for login */}
                <Route path="/login" element={<Login />} />

                {/* Protected route for dashboard */}
                <Route path="/home" element={<DashboardHome />} />
                
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
