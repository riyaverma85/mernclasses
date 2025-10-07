
// routes/testRoutes.js
const express = require("express");
const router = express.Router();
const sessionController= require("../controllers/sessionController");

// Routes
router.get("/", sessionController.Home);
router.get("/display", sessionController.Display);

module.exports = router;
