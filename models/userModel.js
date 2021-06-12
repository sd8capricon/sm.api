const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');

const User = mongoose.Model('User', userSchema);

module.exports = User;