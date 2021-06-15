const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "This username is already taken"],
        maxLength: [12, "maximum username length is 12"],
        minLength: [3, "minimum username length is 3"]
    },
    password: {
        //TODO: add password validator
        type: String,
        required: true,
    },
    email: {
        //TODO: add email validator
        type: String,
        required: true,
        unique: [true, "This email is already in use"],
    },
    friendRequest:[{
        username: String
        //TODO: add timeStamp to friend request
    }]
});

module.exports = userSchema;