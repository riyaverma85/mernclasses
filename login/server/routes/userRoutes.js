
const express=require("express");
const route=express.Router();
const userControll=require("../controllers/userController");


route.post("/login",userControll.userLogin);

module.exports=route;