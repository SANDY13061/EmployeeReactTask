const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/index');
const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');
const cors = require('cors'); // Added CORS middleware for cross-origin requests
const bodyParser = require('body-parser'); // Added body-parser middleware
const morgan = require('morgan'); // Added morgan for HTTP request logging

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Use morgan for logging requests in development

// Routes
app.use('/api/auth', authRoute);
app.use('/api/employees', employeeRoute); // Fixed the route prefix to be plural for consistency

// Sync Database
const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced');
    } catch (err) {
        console.error('Error syncing database: ', err);
    }
};

// Start the server
const startServer = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Initialize application
const initApp = async () => {
    await syncDatabase(); // Wait for database synchronization before starting the server
    startServer(); // Start the server
};

initApp();

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
