require('dotenv').config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const app = express();
PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors:{
        origin: 'http://localhost:3000',
        credentials: true
    }
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//socketio
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on('connection', (socket)=>{
    let activeUsers = [];
    console.log(`${socket.id} has joined`, "username ",socket.username);

    for(let[id, socket] of io.of("/").sockets){    //iterates over id and username for all sockets connected
        activeUsers.push({
            userId: id,
            username: socket.username
        })
    }  
    console.log(activeUsers);
    //emit all connected users  
    socket.emit("users", activeUsers);

    // notify existing users
    socket.broadcast.emit("friend connected", {
      userId: socket.id,
      username: socket.username,
    });

    socket.on('private message', ({ content, id })=>{
        const message = {
            content: content,
            fromId: socket.id,
            fromUsername: socket.username,
            to: id
        }
        console.log("req got")
        console.log("from " + socket.id)
        console.log("to " + id)
        socket.to(id).emit('incoming private message', message)
    })


    socket.on('disconnect', ()=>{
        console.log('disconnect');
        socket.broadcast.emit("friend disconnected", {
            userId: socket.id,
            username: socket.username
        });
    })
})

//connet to mongoDB
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, {useNewUrlParser: true, autoIndex:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
    .then(()=>console.log('Connected to MongoDB')).catch(err=> console.log(err));

//Routes 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

server.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
});