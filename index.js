require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');

//Routes 
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = sockeio(server);
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true});

app.use('/user', authRoutes);

server.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
});