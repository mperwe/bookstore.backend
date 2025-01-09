
const express = require('express');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 



exports.getUsers =async(req,res)=>{
const users= await User.find();
return res.status(200).json({"Users":users,results:users.length})


}
exports.register= async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({ name, email, password:hashedPassword });
 
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};

// Login 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });

  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const date = new Date();
    console.log(`Token Generated at: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,token);

    // Send the token as a response
    return res.status(200).json({
      message: "Successful User Login",
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};




