var database = require('./db');

exports.insertPetition = async function (sender, reciver, total_person, amount, status, createup, updateup) {
    let sql = `INSERT INTO petition (pt_sender_id, pt_reciver_id, pt_total, pt_amount, pt_status, pt_createup, pt_updateup) 
                VALUES ("${sender}", "${reciver}", "${total_person}", "${amount}", "${status}", "${createup}", "${updateup}");`
    // console.log("insertPetition :",sql)

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.insertPetitionDetail = async function (petition_id, descrip, linkto) {
    let sql = `INSERT INTO petition_detail (pd_pt_id,pd_title,pd_linkto)
                VALUES ("${petition_id}","${descrip}","${linkto}")`
    // console.log("insertPetitionDetail :",sql)

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.insertPetitionSentTo = async function (petition_id, id_user, status, reader) {
    let sql = `INSERT INTO petition_sent_to (pst_pt_id,pst_us_id,pst_status,pst_read)
                VALUES ("${petition_id}","${id_user}",${status},${reader})`
    // console.log("insertPetitionSentTo :",sql)

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.get_table_noti = async function (id_user) {
    let sql = `SELECT *,
                CONCAT(a.us_fname," ",a.us_lname) AS sender_name,
                CONCAT(b.us_fname," ",b.us_lname) AS reciver_name
                FROM petition
                LEFT JOIN petition_sent_to ON pst_pt_id = pt_id
                LEFT JOIN user AS a ON a.us_id = pt_sender_id
                LEFT JOIN user AS b ON b.us_id = pt_reciver_id
                WHERE pst_us_id = ${id_user} AND pt_sender_id != ${id_user}
                ORDER BY petition.pt_updateup DESC`

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.get_data_dashboard = async function () {
    let sql = `SELECT pt_id,CONCAT(a.us_fname," ",a.us_lname) AS sender_name,CONCAT(b.us_fname," ",b.us_lname) AS reciver_name,
                pt_status,pt_amount,
                COUNT(CASE WHEN pst_status = 0 THEN 1 ELSE NULL END) AS "Reject" ,
                COUNT(CASE WHEN pst_status = 1 THEN 1 ELSE NULL END) AS "Accept"
                FROM petition
                LEFT JOIN petition_sent_to ON pst_pt_id = pt_id
                LEFT JOIN user AS a ON a.us_id = pt_sender_id
                LEFT JOIN user AS b ON b.us_id = pt_reciver_id
                GROUP BY pt_id`

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.get_data_myTransaction = async function (id_user) {
    let sql = `SELECT pt_id,CONCAT(a.us_fname," ",a.us_lname) AS sender_name,CONCAT(b.us_fname," ",b.us_lname) AS reciver_name,
                pt_status,pt_amount,
                COUNT(CASE WHEN pst_status = 0 THEN 1 ELSE NULL END) AS "Reject" ,
                COUNT(CASE WHEN pst_status = 1 THEN 1 ELSE NULL END) AS "Accept"
                FROM petition
                LEFT JOIN petition_sent_to ON pst_pt_id = pt_id
                LEFT JOIN user AS a ON a.us_id = pt_sender_id
                LEFT JOIN user AS b ON b.us_id = pt_reciver_id
                WHERE pt_sender_id = ${id_user}
                GROUP BY pt_id`

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.get_petition_by_id = async function (id_pettion) {
    let sql = `SELECT pt_id,pt_sender_id,pt_reciver_id,
                pt_status,pt_amount,pt_total,
                COUNT(CASE WHEN pst_status = 0 THEN 1 ELSE NULL END) AS "Reject" ,
                COUNT(CASE WHEN pst_status = 1 THEN 1 ELSE NULL END) AS "Accept"
                FROM petition
                LEFT JOIN petition_sent_to ON pst_pt_id = pt_id
                WHERE pt_id = ${id_pettion}
                GROUP BY pt_id`

    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.update_reader = async function (date_now, pst_id) {
    let sql = `UPDATE petition_sent_to SET pst_read=1,pst_readtime='${date_now}' WHERE id='${pst_id}'`
    console.log("get_data_dashboard :", sql)
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.update_user_status = async function (u_status, date_now, pst_id) {
    let sql = `UPDATE petition_sent_to SET pst_status=${u_status},pst_readtime='${date_now}' WHERE id='${pst_id}'`
    console.log("get_data_dashboard :", sql)
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}

exports.update_petition_status = async function (p_status, date_now, pt_id) {
    let sql = `UPDATE petition SET pt_status=${p_status},pt_updateup='${date_now}' WHERE pt_id='${pt_id}'`
    console.log("get_data_dashboard :", sql)
    let address = await database.connect(sql, null);
    let response = await {
        "status": 200,
        "status_code": 200,
        "messages": "Completed",
        "contents": address
    }
    return response;
}