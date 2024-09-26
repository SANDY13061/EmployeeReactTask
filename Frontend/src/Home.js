import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';

// Components for each route
const Home = () => (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Panel
      </Typography>
      <Typography variant="body1">
        Here you can manage your employee list and access various admin features.
      </Typography>
    </div>
  );
const Logout = () => <div>Logout Component</div>;

const DashboardHome = () => {
  const [activeComponent, setActiveComponent] = useState('Home'); // State to track active component
  const navigate = useNavigate(); // Hook for navigation

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Home />;
      case 'EmployeeList':
        return <EmployeeList />;
      case 'Logout':
        return <Logout />;
      default:
        return <Home />;
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Remove auth token from local storage
    navigate('/'); // Navigate to the home or login page
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => setActiveComponent('Home')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => setActiveComponent('EmployeeList')}>
            Employee List
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Render the active component */}
      <div style={{ padding: '2rem' }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default DashboardHome;
