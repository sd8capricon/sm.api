const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwtutil = require('../utils/jwtutil');

router.post('/register', (req, res)=>{
    console.log(req.body.username);
    const initialPassword = req.body.password;
    if(initialPassword.length>=6 && initialPassword.length<=15){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(initialPassword, salt, (err, hash)=>{
                const user = new User({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email
                });
                user.save((err, user)=>{
                    if(user){
                        res.json({
                            user: user,
                        });
                    }
                    else{
                        console.log(err)
                        res.json({
                            error: err
                        });
                    }
                });
            });
        });
    }
    else{
        res.json({
            err: 'Password should contain 6-15 characters.'
        })
    }
    
});

router.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username:username }, (err, user)=>{
        if(user){
            //use bcrypt to compare
            bcrypt.compare(password, user.password, (err2, result)=>{
                if(result){
                    const token = jwtutil.jwtSign(username);
                    res.json({
                        user : user,
                        isAuthenticated: true,
                        token: token
                    });
                }
                else{
                    res.json({
                        error: "incorrect username or password",
                        isAuthenticated: false,
                    });
                }
            })
        }
        else{
            res.json({
                error: "incorrect username or password",
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