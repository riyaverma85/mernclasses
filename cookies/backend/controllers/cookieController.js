const bcrypt = require("bcryptjs");
const User = require("../models/User");
// Register
const Register= async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login
const Login= async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Set cookie
  res.cookie("authToken", user._id.toString(), {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
    sameSite: "lax"
  });
  res.json({ message: "Login successful!" });
};

// Profile
const Profile=async (req, res) => {
  const { authToken } = req.cookies;
  if (!authToken) return res.status(401).json({ message: "Not authenticated" });
  const user = await User.findById(authToken).select("-password");
  res.json(user);
};

// Logout
const Logout= (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully!" });
};

module.exports={
    Register,
    Login,
    Profile,
    Logout
}