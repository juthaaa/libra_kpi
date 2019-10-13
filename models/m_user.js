var database = require('./db');

exports.finduser = async function (username) {
    let sql = `SELECT *
                FROM user
                WHERE us_email = "${username}";`
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

exports.getall_User = async function () {
    let sql = `SELECT us_id,us_email,us_fname,us_lname,mnm_address
                FROM user
                JOIN mnemonic ON us_id = mnm_us_id;`
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;

}

exports.insertNewUser = async function (username, password) {
    let sql = `INSERT INTO user (us_email, us_password) 
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

exports.insertNewMnemonic = async function (id, ac_address, mnemonic) {
    let sql = `INSERT INTO mnemonic (mnm_us_id,mnm_address,mnm_mnemonic) 
                VALUES ("${id}","${ac_address}", "${mnemonic}");`
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
    let sql = `SELECT *
                FROM mnemonic
                LEFT JOIN user ON us_id=mnm_us_id 
                WHERE us_email = "${username}";`
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

exports.getDashboard = async function (mnm_address) {
    let sql = ` SELECT us_email,us_fname,us_lname FROM user LEFT 
                JOIN mnemonic ON us_id = mnm_us_id 
                WHERE mnm_address = "${mnm_address}" `
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
