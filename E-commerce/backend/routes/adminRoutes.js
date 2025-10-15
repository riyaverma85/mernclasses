// backend/routes/adminRoutes.js
const router = require('express').Router();
const { adminDashboard } = require('../controllers/authController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, adminOnly, adminDashboard);

module.exports = router;
