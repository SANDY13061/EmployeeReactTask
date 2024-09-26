import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('auth-token');

    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/login" />;
    }

    // If token exists, render the children components (dashboard, etc.)
    return children;
};

export default ProtectedRoute;
