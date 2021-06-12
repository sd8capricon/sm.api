const express = require('express');
const mongoose = require('mongoose');

//Routes 
const userRoutes = require('./routes/userRoutes');

const app = express();
PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

mongoose.connect('mongodb+srv://sd8capricon:WeAreNo.1@cluster0.ep8vh.mongodb.net/SecuredMessengerDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true});

app.use('/user', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
});