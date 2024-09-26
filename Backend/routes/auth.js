/**
 * @fileoverview Login,Register Router.
 * @author Santhosh Kumar
 * @created 2024-09-26
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user');

const router = express.Router();

// Registration Validation Schema
const registrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(255).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// Registration Route
router.post('/register', async (req, res) => {
    // Validate data
    const { error } = registrationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(409).send('Username already exists.');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with the hashed password
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).send({ message: 'User registered successfully', userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).send('Invalid username or password.');

        // Check password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid username or password.');

        // Create and assign a token
        const token = jwt.sign({ id: user.id,name:user.username }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
