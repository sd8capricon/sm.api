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
    console.log(`${socket.id} has joined`);
    socket.emit('message', 'hello');

    
    socket.on('disconnect', ()=>{
        console.log('disconnect');
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