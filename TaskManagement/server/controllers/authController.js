const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({ message:"User already exists" });

    if(req.userRole === 'admin' && role !== 'user')
      return res.status(403).json({ message:"Normal admin cannot create admin/owner" });

    const user = new User({name,email,password,role});
    await user.save();
    res.json({ message:"User created", user });
  }catch(err){ res.status(500).json({ message:err.message }); }
}

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({ message:"Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ message:"Invalid password" });

    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({ token, role:user.role });
  }catch(err){ res.status(500).json({ message:err.message }); }
}

module.exports={
    createUser,
    loginUser
}