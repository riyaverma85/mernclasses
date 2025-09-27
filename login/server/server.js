
//=================================================MIDDALEWARE======================================================================
const express=require("express");
const app=express();
const userRoute=require("./routes/userRoutes");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
require("dotenv").config();
const cors=require("cors");
mongoose.connect(process.env.DBCON).then(()=>{
    console.log("Database connected successfully");
})

//Body parser middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.use("/user",userRoute);

const Port=process.env.PORT || 3000

app.listen(Port,()=>{
    console.log(`Server is running on port:${Port}`);
}) 




