const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const verifyJWT = (token) => {
    return jwt.verify(token, 'testJWT', (err, decoded) => {
        if (err) {

            return false;
        }

        return true;
    })
}


router.use((req, res, next) => {
    let token = req.headers.token || null;
    let response = {};
    
    if (token === null) {
        response.message = 'token not found';
        return res.status(400).send(response);
    }

    if(verifyJWT(token)){
        let blacklist = fs.readFileSync('blacklist.txt','utf8');
        let arrblacklist = blacklist.split('\r\n');
        let checkToken = arrblacklist.indexOf(token);
        response.message = 'token expired (blacklist)';
        
        return checkToken == -1 ? next() :  res.status(500).send(response) ;
        
    }else{
        response.message = 'invalid token';
        return res.status(500).send(response);
    }
});

module.exports = router;