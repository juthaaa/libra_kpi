const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://ds163226.mlab.com:63226/um1';
let connection;

router.use(async (req, res, next) => {
    let response = {};
    if(!connection){        
        try{            
            connection = await MongoClient.connect(url, { 
                auth: {
                    user: 'root',
                    password: 'root123'
                },
                useNewUrlParser: true 
            });
            
        }catch(err){          
            response.message = `${err}`;              
            return res.status(500).send(response);            
        }
    }

    req['db'] = connection.db();
    next();
})

module.exports = router