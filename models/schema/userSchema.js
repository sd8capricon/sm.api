const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    },
});

module.exports = userSchema;