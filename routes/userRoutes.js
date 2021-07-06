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
    console.log(fromUser,'  ', toUser);
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

router.get('/getfriends/:username', (req, res)=>{
    const user = undefined || req.params.username;
    if(user===null || user===undefined){
        res.json({
            err: "No User"
        })
    }
    else if(user!==null && user!==undefined){
        User.findOne({username: user}, (err, user)=>{
            if(!err){
                res.json({
                    friends: user.friendList
                })
            }
            else{
                res.json({
                    err: err
                })
            }
        });
    }
    else{
        res.json({
            err: "No User"
        })
    }
})

router.post('/declineRequest', (req, res)=>{
    const user = req.body.user
    const del = req.body.del
    User.findOneAndUpdate({ username: user }, ( {$pull: { friendRequest: { username: del } } }), { new: true }, (err, result)=>{
        if(!err){
            res.json({
                error:"Request Deleted Succesfully"
            })
        }
        else{
            res.json({
                message:"Error Deleting Request"
            })
        }
    })
})

// TODO: add routes to delete received and sent friend req

module.exports = router;