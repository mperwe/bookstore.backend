// Importing the Express library to create and manage routes.
const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router
.post('/register', authController.register)
.post('/login', authController.login)


module.exports = router;
