const router = require('express').Router();
const User = require('../models/userModel');

router.get('/', (req,res)=>{
    User.find({},(err, result)=>{
        res.json({
            users: result,
        });
    });
});

router.post('/sendRequest', (req, res)=>{
    const fromUser = req.body.from;
    const toUser = req.body.to;
    const add = {
        username: fromUser
    }
    User.findOneAndUpdate({username: toUser}, {
                                                $addToSet:{
                                                    friendRequest: {
                                                        $each: [{username: fromUser}]
                                                    }
                                                }
                                            }, { new: true },(err, user)=>{
        if(!err){
            console.log(user);
            res.json({
                user: user
            })
        }
        else{
            res.json({
                error: err
            });
        }
    })
});

router.post('/acceptRequest', (req, res)=>{
    const receiver = req.body.receiver;
    const from = req.body.from;
    User.findOneAndUpdate({username: receiver}, {
                                                  $pull:{
                                                      friendRequest:{
                                                          username: from
                                                        }
                                                    }, 
                                                  $addToSet:{
                                                      friendList:{
                                                        $each: [{username: from}]
                                                        }
                                                    }
                                                }, {new: true, multi:true}, (err, user)=>{
        if(!err){
            console.log(user);
            User.findOneAndUpdate({username: from}, {
                                                      $addToSet:{
                                                          friendList:{
                                                            $each: [{username: receiver}]
                                                            }
                                                        }
                                                    }, {new: true}, (err2, user2)=>{
                if(user2){
                    res.json({
                        user: user,
                        user2: user2,
                    });
                }
                else{
                    res.json({
                        error: err2,
                    })
                }
            });
        }
        else{
            res.json({
                error: err
            });
        }
    });
});

// TODO: add routes to delete received and sent friend req

module.exports = router;