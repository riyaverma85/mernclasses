 //=============================================SESSION===========================================================================


// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");

// App
const app = express();

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// Session
app.use(session({
  secret: "Your_Secret_Key",
  resave: true,
  saveUninitialized: true
}));

// DB Connection
mongoose.connect(process.env.DBCON)
  .then(() => console.log("Database successfully Connected!!!"))
  .catch(err => console.log(err));

// Routes
const sessionRoutes = require("./routes/sessionRoutes");
app.use("/", sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
