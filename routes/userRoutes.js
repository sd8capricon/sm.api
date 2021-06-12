const router = require('express').Router();
const User = require('../models/userModel');

router.post('/create', (req, res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.pass,
        email: req.body.email
    })
    user.save();
});

module.exports = router;