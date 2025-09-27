const jwt = require('jsonwebtoken');

const verifyToken = (roles=[]) => {
  return (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message:"No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
      if(err) return res.status(401).json({ message:"Invalid token" });
      req.userId = decoded.id;
      req.userRole = decoded.role;
      if(roles.length && !roles.includes(decoded.role)){
        return res.status(403).json({ message:"Access denied" });
      }
      next();
    });
  }
}

module.exports = verifyToken;
