const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const registerUser = async (req,res)=>{
  const {name,email,password,role} = req.body;
  const userExists = await User.findOne({email});
  if(userExists) return res.status(400).json({message:"User already exists"});
  const user = await User.create({name,email,password,role});
  if(user){
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      token: generateToken(user._id)
    });
  }else{
    res.status(400).json({message:"Invalid user data"});
  }
};

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(user && await user.matchPassword(password)){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      token: generateToken(user._id)
    });
  }else{
    res.status(401).json({message:"Invalid email or password"});
  }
};

module.exports = { registerUser, loginUser };
