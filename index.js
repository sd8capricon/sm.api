require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Routes 
const authRoutes = require('./routes/authRoutes');

const app = express();
PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true});

app.use('/user', authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
});