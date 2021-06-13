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
    fromUser = req.body.from;
    toUser = req.body.to;
    User.findOneAndUpdate({username: toUser}, {"$addToSet":{"friendRequest":{username: fromUser}}}, { new: true },(err, user)=>{
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

module.exports = router;