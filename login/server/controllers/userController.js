const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 const userAuth=async(req, res)=>{
 const token=req.header("x-auth-token");
 const verified = jwt.verify(token, "shivani123");
 console.log(verified.id);
 const User = await UserModel.findById(verified.id);
  res.send({user:User});
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email: email });

    if (!User)
        {
           res.send("Invalid Email!");
        }

        const validPassword = await bcrypt.compare(password, User.password);

        if (!validPassword)
        {
            res.send("Invalid Password!");
        }
       res.status(202).send({ msg: "You are successfully logged in!",
      user: {
        name: User.name,
        email: User.email
      }
    });

   const token = await jwt.sign({id:User._id}, "shivani123",  { expiresIn: '7 days' } )
     
     res.send({token:token});
};


module.exports = {
    userLogin,
    
}








