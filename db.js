require('dotenv').config();
exports.connect = function (sqlString, data) {
    return new Promise(function (resolve, reject) {
        var mysql = require('mysql');
        // console.log(".env",process.env)
        var connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: '',
            database: process.env.DB_NAME,
            //rutimezone: '+07:00'
        });
        connection.connect((err) => {
            if (err) {
                console.log(err);
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
            connection.query(sqlString, data, function (error, result) {
                if (error) {
                    console.log(error.message);
                    return reject("error");
                } else {
                    console.log('Connect Success');
                    return resolve(result);
                }
            });
            connection.end();
        });
    });
}
