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




