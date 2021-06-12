const mongoose = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "This username is already taken"],
        maxLength: [12, "maximum username length is 12"],
        minLength: [3, "minimum username length is 3"]
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already in use"],
        maxLength: [12, "maximum email length is 12"],
        minLength: [3, "minimum email length is 3"]
    },
});

module.exports = userSchema;