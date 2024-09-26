/**
 * @fileoverview Employee CRUD.
 * @author Santhosh Kumar
 * @created 2024-09-25
 */


const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const { Op } = require('sequelize');

const router = express.Router();

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Employee Validation Schema
const employeeSchema = Joi.object({
    f_Name: Joi.string().required(),
    f_Email: Joi.string().email().required(),
    f_Mobile: Joi.string().regex(/^[0-9]{10}$/).required(),
    f_Designation: Joi.string().valid('HR', 'Manager', 'Sales').required(),
    f_Gender: Joi.string().valid('M', 'F').required(),
    f_Course: Joi.string().required(),
});
router.use(authMiddleware);

// Create Employee with Image Upload
router.post('/create', upload.single('f_Image'), async (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

        // Check if email already exists
        const emailExists = await Employee.findOne({ where: { f_Email } });
        if (emailExists) return res.status(400).send('Email already exists');

        // Get image buffer from the file upload
        const f_Image = req.file ? req.file.buffer : null;

        const employee = await Employee.create({
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_Image // Store the image as BLOB
        });
        res.send(employee);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update Employee by ID
router.put('/update/:id', upload.single('f_Image'), async (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { id } = req.params;
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

        // Find the employee by id
        const employee = await Employee.findByPk(id);
        if (!employee) return res.status(404).send('Employee not found');

        // Check if email already exists (but ignore the current employee's email)
        const emailExists = await Employee.findOne({
            where: { f_Email, id: { [Op.ne]: id } } // Check for emails that are not the current employee's email
        });
        if (emailExists) return res.status(400).send('Email already exists');

        // Get the updated image buffer, if provided
        const f_Image = req.file ? req.file.buffer : employee.f_Image;

        // Update employee fields
        await employee.update({
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_Image // Update image if a new one is provided
        });

        res.send(employee);
    } catch (err) {
        console.error(err); // Log the error details
        res.status(500).send('Server error');
    }
});


// Get All Employees
router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.findAll();

        // Convert BLOB to Base64
        const formattedEmployees = employees.map(emp => ({
            id: emp.id,
            f_Name: emp.f_Name,
            f_Email: emp.f_Email,
            f_Mobile: emp.f_Mobile,
            f_Designation: emp.f_Designation,
            f_Gender: emp.f_Gender,
            f_Course: emp.f_Course,
            f_CreatedDate: emp.f_CreatedDate,
            // Convert image BLOB to Base64
            f_Image: emp.f_Image ? Buffer.from(emp.f_Image).toString('base64') : null
        }));

        res.json(formattedEmployees); // Return formatted employees as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Server error');
    }
});

// Fetch employee with image as base64 (for frontend display)
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');

        // Convert image BLOB to base64
        const imageBase64 = employee.f_Image ? employee.f_Image.toString('base64') : null;
        res.send({ ...employee.toJSON(), f_Image: imageBase64 });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete Employee
router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.destroy({ where: { id: req.params.id } });
        res.send('Employee deleted');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
