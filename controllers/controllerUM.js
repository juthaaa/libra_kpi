module.exports.login = async (req,res) => {
   
    console.log(req.body)
    let serviceName = 'UM : Login'
    let username = req.body.username || null
    let password = req.body.password || null
    let response = {}

    if(username == null || password == null){
        let error = `${serviceName} , Error: Parametor not found`
        response.message = error
        return res.status(400).send(response)
    }

    try{
        let result = true
        if(username == 'jutha' && password == '123456')
            result = true
        else
            result = false

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