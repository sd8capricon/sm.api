const express = require('express');
const mongoose = require('mongoose');

const app = express();
PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://sd8capricon:WeAreNo.1@cluster0.ep8vh.mongodb.net/SecuredMessengerDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});


app.listen(PORT, ()=>{
    console.log(`Server Listening on PORT ${PORT}`)
});