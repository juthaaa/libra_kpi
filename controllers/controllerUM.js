const finduser = require('../models/m_user')
var md5 = require('md5');

module.exports.login = async (req,res) => {
    
    // console.log(req.body)
    let serviceName = 'UM : Login'
    let username = req.body.username || null
    let password = req.body.password || null
    let response = {}
    if(username == null || password == null){
        let error = `${serviceName} , Error: Parametor not found`
        response.message = error
        return res.status(400).send(response)
    }
    let results = await finduser.finduser(username)
    
    try{
        // console.log("result",results)
        if(results.contents[0]==null){
            response.message = `${serviceName} , Error : username or password invalid`;
            return res.status(500).send(response);
        }else{
            var result = (username == results.contents[0].fname && md5(password) == results.contents[0].passwd)
        }
        // console.log(md5(password))
        if(result){
            response.message = `${serviceName} : Successfully !`
            return res.status(200).send(response)
        }
        response.message = `${serviceName} , Error : username or password invalid`;
        return res.status(500).send(response);
        
    }catch(error){
        response.message = `${serviceName} , Error : ${error}`;
        return res.status(500).send(response);
    }
}

module.exports.signin = async (req,res) => {
    console.log(req.body)
    let serviceName = 'UM : Signin'
    let username = req.body.username || null
    let password = req.body.password || null
    let passwordagain = req.body.passwordagain || null
    let response = {}

    let results = await finduser.finduser(username)
    if(results.contents[0]!=null){
        response.message = `${serviceName} , Error : username or password have in database`;
        return res.status(200).send(response);
    }

}