const router = require('express').Router();
const User = require('../models/userModel');
const jwtutil = require('../utils/jwtutil');

router.post('/register', (req, res)=>{
    console.log(req.body.username);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save((err, user)=>{
        if(user){
            res.json({
                user: user,
            })
        }
        else{
            console.log(err)
            res.json({
                errCode: err.code,
                errKey: err.keyValue
            })
        }
    });
});

router.post('/login', (req, res)=>{
    username = req.body.username;
    password = req.body.password;
    User.findOne({ username:username }, (err, user)=>{
        if(user){
            //use bcrypt to compare
            if(password == user.password){
                const token = jwtutil.jwtSign(username);
                res.status(200).json({
                    user : user,
                    isAuthenticated: true,
                    token: token
                });
            }
            else{
                res.json({
                    error: 'Incorrect Username or Password',
                    isAuthenticated: false,
                });
            }
        }
        else{
            res.json({
                error: err,
                isAuthenticated: false,
            });
        }
    });
});


router.post('/verifyToken', (req, res)=>{
    const token = req.body.token;
    var {authStatus, error} =  jwtutil.jwtVerify(token);
    res.json({
        isAuthenticated: authStatus,
        err: error
    })
});

module.exports = router;