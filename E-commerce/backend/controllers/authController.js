// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAdminIfNotExists = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pwd = process.env.ADMIN_PASSWORD;
    if (!email || !pwd) return console.warn('Admin env not set');
    const existing = await User.findOne({ email });
    if (existing) return;
    const hash = await bcrypt.hash(pwd, 10);
    await User.create({ name: 'Admin', email, password: hash, role: 'admin' });
    console.log('🛠 Default admin created:', email);
  } catch (err) {
    console.error('Admin seed error', err);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    return res.status(201).json({ message: 'Registered', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// simple admin-only test endpoint controller
exports.adminDashboard = async (req, res) => {
  res.json({ message: `Welcome admin ${req.user.name}` });
};

module.exports.createAdminIfNotExists = createAdminIfNotExists;
