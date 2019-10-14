var database = require('./db');

/* for function : login , singin */
exports.finduser_for_login = async function (username) {
    let sql = `SELECT us_email,us_password,mnm_mnemonic,mnm_address
                FROM user
                LEFT JOIN mnemonic ON us_id=mnm_us_id
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

/* for function : getforUserModal */
exports.get_for_userSelect = async function () {
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

exports.insertNewUser = async function (email, password, fname, lname) {
    let sql = `INSERT INTO user (us_email, us_password, us_fname, us_lname) 
                VALUES ("${email}", "${password}", "${fname}", "${lname}");`
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

/* for function : transfer */
exports.findmnemonic = async function (username) {
    let sql = `SELECT mnm_address,mnm_mnemonic
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

/* for function : getfortableBalance */
exports.get_user_by_mnmemoic = async function (mnm_address) {
    let sql = ` SELECT us_email,us_fname,us_lname FROM user 
                LEFT JOIN mnemonic ON us_id = mnm_us_id 
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

