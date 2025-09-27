
const express = require("express");
const route = express.Router();
const cookieController=require("../controllers/cookieController")

route.post("/register",cookieController.Register);
route.post("/login",cookieController.Login);
route.get("/profile",cookieController.Profile);
route.post("/logout",cookieController.Logout);

module.exports = route;