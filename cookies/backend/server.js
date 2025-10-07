//=================================================COOKIES==========================================================================
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/cookiesRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.DBCON, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

// Routes
app.use("/", authRoutes);
const Port=process.env.PORT ||5000
app.listen(Port, () => {
    console.log(`Server running on ${Port}`);
})
    


