require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT

// import middlewares
var middleware = require('./middlewares/middlewareIndex');
app.use('/', middleware);

// import router
var router = require('./routes/routeIndex');
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))








