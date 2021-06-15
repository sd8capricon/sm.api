require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtSign(username){
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '4h' });
    return token;
}

function jwtVerify(token){
    let authStatus;
    let error;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(!err){
            authStatus = true;
        }else{
            authStatus = false;
            error = err;
        }
    });
    return { authStatus, error };
}

module.exports = {jwtSign, jwtVerify};