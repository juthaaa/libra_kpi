require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT

// import middlewares
var middleware = require('./middlewares/middlewareIndex');
app.use('/', middleware);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.header('Access-Control-Allow-Headers',' Origin, Content-Type, Accept, Authorization, X-Request-With');
    res.header('Access-Control-Allow-Credentials',' true');
  next();
});

// import router
var router = require('./routes/routeIndex');
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))








