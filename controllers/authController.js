
const express = require('express');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 




exports.register= async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({ name, email, password:hashedPassword });
 
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};

// Login route: Handles user login
exports.login = async (req, res) => {
 
  const { email, password } = req.body;

  try {
    // Find the user in the database using the provided email
    const user = await User.findOne({ email });

    
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // If credentials are valid, generate a JWT token with the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    const date = new Date()
    res.status(200).json({message:"Successful User Login",token});
    console.log(userToken,`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)



  } catch (err) {
   
    res.status(400).json({ error: err.message });
  }
};



