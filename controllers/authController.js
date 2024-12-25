// Importing the Express library to create and manage routes.
const express = require('express');

// Destructuring `register` and `login` functions from the `authController` file.
// These are the controller functions handling the logic for user registration and login.
const { register, login } = require('../controllers/authController');

// Creating a new Express Router instance to define routes for authentication.
const router = express.Router();

// Defining a POST route for user registration.
// When a POST request is made to `/register`, the `register` controller function is executed.
router.post('/register', register);

// Defining a POST route for user login.
// When a POST request is made to `/login`, the `login` controller function is executed.
router.post('/login', login);

// Exporting the router so it can be used in other parts of the application.
module.exports = router;
