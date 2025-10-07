
const express = require('express');
const https = require('https');
const {Server} = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const httpsServer = https.createServer(app);

//Setup Socket.io server
const io = new Server(httpsServer, {
    cors: {
        origin: "http://localhost:5173",         // React app origin
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      console.log("Message from client",data);
      //Broadcast message to all clients except sender
        socket.broadcast.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

httpsServer.listen(5000, () => {
    console.log("Server is running on https://localhost:5000");
});