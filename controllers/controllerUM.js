const finduser = require('../models/m_user')
var md5 = require('md5');
const LibraService = require('../service_libra/libra_service')
const axios = require('axios');

const Faucent = require('../service_libra/faucet')
const USE_KULAP_FAUCET = (undefined === process.env.USE_KULAP_FAUCET) ? true : process.env.USE_KULAP_FAUCET === 'true'
console.log("USE_KULAP_FAUCET :", USE_KULAP_FAUCET)
const AMOUNT_TO_MINT = process.env.AMOUNT_TO_MINT || 100
console.log("Amount To mint :", AMOUNT_TO_MINT)
module.exports.login = async (req, res) => {

    // console.log(req.body)
    let serviceName = 'UM : Login'
    let username = req.body.username || null
    let password = req.body.password || null

    console.log("req.body :", username, md5(password))
    let response = {}
    if (username == null || password == null) {
        response.message = `${serviceName} , Error: Parametor not found`
        response.status_text = "error"
        return res.status(200).send(response)
    }
    let results = await finduser.finduser(username)
    if (results.contents[0] == undefined) {
        response.message = `${serviceName} , Error : username or password invalid`;
        response.status_text = "error";
        return res.status(200).send(response);
    }

    try {
        console.log("result", results.contents[0])

        if (!(username == results.contents[0].us_email && md5(password) == results.contents[0].us_password)) {
            response.message = `${serviceName} , Error : username or password invalid`;
            response.status_text = "error";
            return res.status(200).send(response);
        } else {
            var result = (username == results.contents[0].us_email && md5(password) == results.contents[0].us_password)
        }
        // console.log(md5(password))
        if (result) {
            let result_mnemonic = await finduser.findmnemonic(username)
            let mnemonics = {}
            mnemonics.mnemonic = result_mnemonic.contents[0].mnm_mnemonic

            console.log("test_mnemonics", mnemonics);

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

module.exports.signin = async (req, res) => {
    // console.log(req.body)
    let serviceName = 'UM : Signin'
    let username = req.body.username || null
    let password = req.body.password || null
    let response = {}

    let results = await finduser.finduser(username)
    if (results.contents[0] != null) {
        response.message = `${serviceName} , Error : username or password have in database`;
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
        let insert_user = await finduser.insertNewUser(username, md5(password))
        // console.log(insert_user.contents.insertId)
        let id_newmnemonic = insert_user.contents.insertId
        await finduser.insertNewMnemonic(id_newmnemonic, wallet.address, memMnemonic)

    }
    // console.log('https://api-test.libexplorer.com/api?module=account&action=balance&address=' + response.wallet.address)

    return res.status(200).send(response)

}

module.exports.getUserAll = async (req, res) => {
    let serviceName = 'UM : getUserAll'
    let response = {}
    console.log(serviceName)

    let results = await finduser.getall_User()

    response.result = results
    return res.status(200).send(response)
}

module.exports.getforDashboard = async (req, res) => {
    let serviceName = `UM : getforDashboard`
    let address = req.body.address || null
    let response = {}
    console.log(serviceName)

    let result_db = await finduser.getDashboard(address)
    // console.log("reslt_db :",result_db)
    response.userdata = result_db.contents[0]

    // console.log("path of query balance :", 'https://api-test.libexplorer.com/api?module=account&action=balance&address=' + address)
    // get balance form api testnet
    

    let reslt_userall = await finduser.getall_User()
    // console.log("reslt_userall :",reslt_userall)
    response.datauserall = reslt_userall.contents
    
    return res.status(200).send(response)
}

