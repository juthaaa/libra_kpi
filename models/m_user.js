var mydb = require('./configMysql');


module.exports.findlogin = function(username,password,result){
    let sql = `SELECT fname,passwd 
                FROM user
                WHERE fname = ?,?`
    mydb.config.query(sql,username,password,function(err,ress){
        if(err){
            console.log("error :",err)
            result(err, null)
        }else{
            console.log(ress)
            result(null,ress)
        }
    })
}


mydb.getallUser = function(result){
    let sql = `SELECT fname,passwd 
                FROM user`
    
}

