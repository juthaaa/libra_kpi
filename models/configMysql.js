'user strict';

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libra_kpi'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connect!!");
    
});

exports.config = con