const router = require('express').Router();
const User = require('../models/userModel');

router.post('/create', (req, res)=>{
    console.log(req.body.username);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save((user, err)=>{
        if(err){
            res.json({
                err: err
            })
        }
        else{
            res.json({
                user: user
            })
        }
    });
});

module.exports = router;