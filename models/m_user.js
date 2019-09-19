var database = require('../db');

exports.finduser = async function (username) {
    let sql =  `SELECT *
                FROM user
                WHERE fname = "${username}";`
    // console.log("sql",sql)
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.getall_User = async function(){
    let sql =  `SELECT *
                FROM user;`
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
    
}

exports.insertNewUser = async function(username,password){
    let sql =  `INSERT INTO user (fname, passwd) 
                VALUES ("${username}", "${password}");`
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.insertNewMnemonic = async function(username,mnemonic){
    let sql =  `INSERT INTO mnemonic (us_id, mnemonic) 
                VALUES ("${username}", "${mnemonic}");`
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;    
}

exports.findmnemonic = async function (username) {
    let sql =  `SELECT *
                FROM mnemonic
                WHERE us_id = "${username}";`
    //  console.log("sql",sql)
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

