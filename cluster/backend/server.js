
// // //=======================================FORK LENGTH CODE==================================================================
// // const http=require("http");
// // const os=require("os");
// // const cluster=require("cluster");
// // if(cluster.isMaster){
   
// //     const frkLength=os.cpus().length;
// //      console.log(`Master process PID:${process.pid}`);
// //      console.log(`Forking ${frkLength} workers......`)
// //     for(var i=0; i<frkLength; i++){
// //         cluster.fork();
// //     }


// // //
// // cluster.on("exit",(worker,code,signal)=>{
// //     console.log(`Worker ${worker.process.pid} died.Forking a new worker....`);
// //     cluster.fork();
// // });
// // }
// // else{
// //     http.createServer((req,res)=>{
// //       res.write("<h1>welcome to node js App </h1>")
// //       res.end(`Handled by worker process PID:${process.pid}\n`);
 
// // }).listen(8000)
// // }


//=====================================================USING EXPRESS==========================================================
// const cluster = require('cluster');
// const os = require('os');
// const express = require('express');

// if (cluster.isMaster) {
//   const numCPUs = os.cpus().length;
//   console.log(`Master process PID: ${process.pid}`);
//   console.log(`Forking ${numCPUs} workers...`);
//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
//     cluster.fork();
//   });
// } else {
//   const app = express();
//   app.get('/', (req, res) => {
//     res.send(`Hello from worker process PID: ${process.pid}`);
//   });
//   app.listen(3000, () => {
//     console.log(`Worker process PID: ${process.pid} is running`);
//   });
// }

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/paginationdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Pagination Route
app.get("/users", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.json({ message: "✅ User added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
