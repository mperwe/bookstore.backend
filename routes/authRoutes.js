// Import necessary modules
const express = require('express');
const User = require('../models/User'); // Import the User model for database interaction
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing and comparison

// Create an instance of the Express router
const router = express.Router();

// Register route: Handles user registration
router.post('/register', async (req, res) => {
  // Destructure name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // Create a new user using the User model
    const user = await User.create({ name, email, password });
    // Respond with a success message once the user is created
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Catch errors and respond with an error message
    res.status(400).json({ error: err.message });
  }
});

// Login route: Handles user login
router.post('/login', async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user in the database using the provided email
    const user = await User.findOne({ email });

    // If user is not found, return an error response
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // If credentials are valid, generate a JWT token with the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set token expiration time to 1 hour
    });

    // Respond with the generated token
    res.json({ token });
  } catch (err) {
    // Catch errors and respond with an error message
    res.status(400).json({ error: err.message });
  }
});

// Export the router to use in other parts of the app
module.exports = router;
