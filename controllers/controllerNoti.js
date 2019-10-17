const con_m_petition = require('../models/m_petition')
const con_m_user = require('../models/m_user')

module.exports.create_petiton = async (req, res) => {
    let serviceName = "noti : create_petiton"
    console.log(serviceName)
    let response = {}

    //req form body 
    let sender = req.body.sender || null
    let reciver = req.body.reciver || null
    let amount = req.body.amount || null
    let pt_description = req.body.description || null
    console.log(sender,reciver,amount,pt_description)

    // set total member
    let result_count_alluser = await con_m_user.get_count_userall()
    let total = result_count_alluser.contents[0].count_member

    //getDate now
    let getdate = new Date
    let date = getdate.getFullYear() + "-" + (getdate.getMonth() + 1) + "-" + getdate.getDate() + " " + getdate.getHours() + ":" + getdate.getMinutes() + ":" + getdate.getSeconds()

    // // insert to DB petition
    let result_petition = await con_m_petition.insertPetition(sender, reciver, total, amount, "pending", date, date)
    petition_id = result_petition.contents.insertId //pt_id last insert

    // //insert to DB petition_detail
    await con_m_petition.insertPetitionDetail(petition_id, pt_description, null)

    //sent_to_member (save to DB petition_sent_to)
    let result_userId_all = await con_m_user.get_all()
    userId_all = result_userId_all.contents
    // response.userId_all = []
    for (let i in userId_all) {
        let status = null
        let reader = 0
        if (userId_all[i].us_id == sender) {
            status = 1
            reader = 2
        }
        // tmp.us_id = userId_all[i].us_id
        // response.userId_all.push(tmp)
        let result_petition_sent_to = await con_m_petition.insertPetitionSentTo(petition_id, userId_all[i].us_id, status, reader)
    }

    // 
    response.petition = petition_id
    return res.status(200).send(response)
}

module.exports.get_for_table_noti = async (req, res) => {
    let serviceName = "noti : get_for_table_noti"
    console.log(serviceName)
    let response = {}

    let user_id = req.body.id || null

    let result_data_noti = await con_m_petition.get_table_noti(user_id)

    response.result_data_noti = result_data_noti.contents

    return res.status(200).send(response)
}

module.exports.get_data_dashbord  = async (req,res) => {
    let serviceName = "noti : get_data_dashbord"
    console.log(serviceName)
    let response = {}

    let result_data_dash = await con_m_petition.get_data_dashboard()

    response.result_data_dash = result_data_dash.contents

    return res.status(200).send(response)
}

module.exports.get_data_mytracsaction  = async (req,res) => {
    let serviceName = "noti : get_data_mytracsaction"
    console.log(serviceName)
    let response = {}
    let user_id = req.body.id || null

    let result_data_mytran = await con_m_petition.get_data_myTransaction(user_id)

    response.result_data_mytran = result_data_mytran.contents

    return res.status(200).send(response)
}

module.exports.update_reader_noti = async (req,res) => {
    let serviceName = "noti : update_reader_noti"
    console.log(serviceName)
    let response = {}

    let pst_id = req.body.id || null

    //getDate now
    let getdate = new Date
    let date = getdate.getFullYear() + "-" + (getdate.getMonth() + 1) + "-" + getdate.getDate() + " " + getdate.getHours() + ":" + getdate.getMinutes() + ":" + getdate.getSeconds()

    let result_update_reader = await con_m_petition.update_reader(date,pst_id)
    response.result_update_reader = result_update_reader.contents   

    return res.status(200).send(response)
}

module.exports.update_user_status = async (req,res) => {
    let serviceName = "noti : update_user_status"
    console.log(serviceName)
    let response = {}

    let pst_id = req.body.id || null
    let status = req.body.us_status || null

    let getdate = new Date
    let date = getdate.getFullYear() + "-" + (getdate.getMonth() + 1) + "-" + getdate.getDate() + " " + getdate.getHours() + ":" + getdate.getMinutes() + ":" + getdate.getSeconds()

    let result_update_status_user = await con_m_petition.update_user_status(status,date,pst_id)
    response.result_update_status_user = result_update_status_user.contents  
    
    return res.status(200).send(response)
}

module.exports.update_petiton_status = async (req,res)=>{
    let serviceName = "noti : update_petiton_status"
    console.log(serviceName)
    let response = {}

    let pt_id = req.body.id || null
    // let status = req.body.us_status || null

    let result_data_petition = await con_m_petition.get_petition_by_id(pt_id)
    response.result_data_petition = result_data_petition.contents[0]
    let user_total = result_data_petition.contents[0].pt_total
    let accept_total = result_data_petition.contents[0].Accept
    let reject_total = result_data_petition.contents[0].Reject
    console.log(accept_total+reject_total+">="+parseInt(user_total/2+1))
    if((accept_total+reject_total)>=parseInt(user_total/2+1)){
        let getdate = new Date
        let date = getdate.getFullYear() + "-" + (getdate.getMonth() + 1) + "-" + getdate.getDate() + " " + getdate.getHours() + ":" + getdate.getMinutes() + ":" + getdate.getSeconds()
        if((accept_total)>=parseInt(user_total/2+1)){
            response.message = "success"
            let result_update_pettion = await con_m_petition.update_petition_status(1,date,pt_id)
            response.result_update_pettion = result_update_pettion
        }else if((reject_total)>=parseInt(user_total/2+1)){
            response.message = "reject"
            let result_update_pettion = await con_m_petition.update_petition_status(2,date,pt_id)
            response.result_update_pettion = result_update_pettion
        }
    }

    return res.status(200).send(response)
}