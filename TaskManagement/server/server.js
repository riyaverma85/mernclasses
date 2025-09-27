require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DBCON).then(()=>console.log("Database connected"))
  .catch(err=>console.log("DB error:", err));

app.use('/user', authRoutes);
app.use('/task', taskRoutes);

const Port=process.env.PORT ||5000
app.listen(Port, ()=>{
  console.log(`Server running on port ${Port}`);
})
