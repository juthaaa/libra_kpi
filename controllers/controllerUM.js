const finduser = require('../models/m_user')
var md5 = require('md5');
const LibraService = require('../service_libra/libra_service')
const axios = require('axios');

const Faucent = require('../service_libra/faucet')
const USE_KULAP_FAUCET = (undefined === process.env.USE_KULAP_FAUCET) ? true : process.env.USE_KULAP_FAUCET === 'true'
// console.log("USE_KULAP_FAUCET :", USE_KULAP_FAUCET)
const AMOUNT_TO_MINT = process.env.AMOUNT_TO_MINT || 100
console.log("Amount To mint :", AMOUNT_TO_MINT)
module.exports.login = async (req, res) => {

    // console.log(req.body)
    let serviceName = 'UM : Login'
    let username = req.body.username || null
    let password = req.body.password || null
    console.log(serviceName)
    // console.log("req.body :", username, md5(password))
    let response = {}
    if (username == null || password == null) {
        response.message = `${serviceName} , Error: Parametor not found`
        response.status_text = "error"
        return res.status(200).send(response)
    }
    let results = await finduser.finduser_for_login(username)
    if (results.contents[0] == undefined) {
        response.message = `${serviceName} , Error : username or password invalid`;
        response.status_text = "error";
        return res.status(200).send(response);
    }

    try {
        // console.log("result", results.contents[0])

        if (!(username == results.contents[0].us_email && md5(password) == results.contents[0].us_password)) {
            response.message = `${serviceName} , Error : username or password invalid`;
            response.status_text = "error";
            return res.status(200).send(response);
        } else {
            var result = (username == results.contents[0].us_email && md5(password) == results.contents[0].us_password)
        }
        // console.log(md5(password))
        if (result) {
            let mnemonics = {}
            mnemonics.mnemonic = results.contents[0].mnm_mnemonic

            // console.log("test_mnemonics", mnemonics);

            const libra = new LibraService()
            const createdResult = await libra.createWallet(mnemonics)
            // let memMnemonic = createdResult.mnemonic
            const wallet = {
                address: createdResult.address,
                mnemonic: createdResult.mnemonic
            }
            response.address = wallet.address
            response.mnemonic = wallet.mnemonic


            response.status_text = "success"
            return res.status(200).send(response)
        }
        response.message = `${serviceName} , Error : username or password invalid`;
        return res.status(200).send(response);

    } catch (error) {
        response.message = `${serviceName} , Error : ${error}`;
        return res.status(500).send(response);
    }
}

module.exports.signup = async (req, res) => {
    // console.log(req.body)
    let serviceName = 'UM : Signin'
    let email = req.body.email || null
    let password = req.body.password || null
    let fname = req.body.fname || null
    let lname = req.body.lname || null
    let response = {}

    let results = await finduser.finduser_for_login(email)
    if (results.contents[0] != null) {
        response.message = `email have in database`;
        response.status = "error"
        return res.status(200).send(response);
    } else {
        const libra = new LibraService()
        const createdResult = await libra.createWallet()
        let memMnemonic = createdResult.mnemonic
        const wallet = {
            address: createdResult.address,
            mnemonic: memMnemonic + ';1',
            balance: AMOUNT_TO_MINT
        }
        console.log('wallet', wallet)
        response.wallet = wallet
        const faucent = new Faucent()
        if (USE_KULAP_FAUCET) {
            await faucent.getFaucetFromKulap(AMOUNT_TO_MINT, createdResult.address)
        } else {
            console.log("Mint to testnet")
            await faucent.getFaucetFromLibraTestnet(AMOUNT_TO_MINT, createdResult.address)
        }
        let insert_user = await finduser.insertNewUser(email, md5(password),fname,lname)
        // console.log(insert_user.contents.insertId)
        let id_newmnemonic = insert_user.contents.insertId
        await finduser.insertNewMnemonic(id_newmnemonic, wallet.address, memMnemonic)
        response.status = "success"
    }
    // console.log('https://api-test.libexplorer.com/api?module=account&action=balance&address=' + response.wallet.address)

    return res.status(200).send(response)

}

module.exports.getfor_user_modal = async (req, res) => {
    let serviceName = 'UM : getfor_user_modal'
    let response = {}
    console.log(serviceName)

    let results = await finduser.get_for_userSelect()
    let datas = results.contents
    
    response.data=[]

    for(let index in datas){
        let tmp = {}
        tmp.email = datas[index].us_email
        tmp.name = datas[index].us_fname+"  "+datas[index].us_lname
        tmp.address = datas[index].mnm_address

        response.data.push(tmp)
    }

    return res.status(200).send(response)
}

module.exports.getfor_table_balance = async (req, res) => {
    let serviceName = `UM : getfor_table_balance`
    let address = req.body.address || null
    let response = {}
    console.log(serviceName)

    let reslt_userall = await finduser.get_for_userSelect(address)
    let datas = reslt_userall.contents
      response.datas = []
    for (let index in datas) {
        let tmp = {}
        // console.log("email :", datas[index].us_email)
        tmp.email = datas[index].us_email
        // console.log("address :", datas[index].mnm_address)
        tmp.address = datas[index].mnm_address
        // console.log("name :",datas[index].us_fname,datas[index].us_lname)
        tmp.name = datas[index].us_fname+"  "+datas[index].us_lname
        //get balance by api testnet
        await axios.get('https://api-test.libexplorer.com/api?module=account&action=balance&address=' + datas[index].mnm_address)
            .then(res => {
                // console.log("test :", res.data.result / 1000000)
                tmp.balance = res.data.result / 1000000
            })
         response.datas.push(tmp)
        
    }
    return res.status(200).send(response)
}

module.exports.get_user_account = async (req,res) => {
    let serviceName = `UM : get_account`
    let address = req.body.address || null
    console.log(address)
    let response = {}
    console.log(serviceName)

    let result_account = await finduser.get_user_by_mnmemoic(address)

    response.data = result_account.contents
    return res.status(200).send(response)
}
