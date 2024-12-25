// Importing the User model to interact with the users collection in the database.
const User = require("../models/User");

// Importing the jsonwebtoken library for generating and verifying JWT tokens.
const jwt = require("jsonwebtoken");

// Controller function for user registration (sign-up).
// Handles the creation of a new user in the database.
const signUp = async (req, res) => {
  try {
    // Extracting username, email, and password from the request body.
    const { username, email, password } = req.body;

    // Creating a new User instance with the provided data.
    const user = new User({ username, email, password });

    // Saving the new user to the database.
    await user.save();

    // Sending a success response with an appropriate message.
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Sending a response with an error status and message in case of failure.
    res.status(400).json({ error: err.message });
  }
};

// Controller function for user login.
// Handles user authentication and returns a JWT token upon successful login.
const login = async (req, res) => {
  try {
    // Extracting email and password from the request body.
    const { email, password } = req.body;

    // Finding the user in the database by email.
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validating the provided password using a method defined in the User model.
    const isValid = await user.isPasswordValid(password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    // Generating a JWT token with the user's ID as the payload and a 1-hour expiration time.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Sending a success response with the token and message.
    res.json({ message: "Login successful", token });
  } catch (err) {
    // Sending a response with an error status and message in case of failure.
    res.status(400).json({ error: err.message });
  }
};

// Exporting the signUp and login controller functions to be used in other parts of the application.
module.exports = { signUp, login };
