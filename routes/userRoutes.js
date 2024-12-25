// Import necessary modules
const express = require("express"); // Import Express framework to handle routing
const { signUp, login } = require("../controllers/userController"); // Import the signUp and login functions from the userController
const router = express.Router(); // Create a new Express Router to handle user-related routes

// Route to handle user signup
// This route listens for POST requests to '/signup' for registering a new user
router.post("/signup", signUp); // Call the signUp function when a POST request is made to /signup

// Route to handle user login
// This route listens for POST requests to '/login' for logging in an existing user
router.post("/login", login); // Call the login function when a POST request is made to /login

// Export the router to be used in the main application file
module.exports = router; // Export the router so it can be included in the main app file
