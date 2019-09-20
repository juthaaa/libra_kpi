const finduser = require('../models/m_user')
var md5 = require('md5');
const LibraService = require('../service_libra/libra_service')

const Faucent = require('../service_libra/faucet')
const USE_KULAP_FAUCET = (undefined === process.env.USE_KULAP_FAUCET) ? true : process.env.USE_KULAP_FAUCET === 'true'
console.log("USE_KULAP_FAUCET :",USE_KULAP_FAUCET)
const AMOUNT_TO_MINT = process.env.AMOUNT_TO_MINT || 100

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
            let result_mnemonic = await finduser.findmnemonic(username)
            let mnemonics = {}
            mnemonics.mnemonic = result_mnemonic.contents[0].mnemonic
            
            // console.log("test_mnemonics",mnemonics);
            
            const libra = new LibraService()
            const createdResult = await libra.createWallet(mnemonics)
            let memMnemonic = createdResult.mnemonic
            const wallet = {
                address: createdResult.address,
                mnemonic: memMnemonic + ';1'
            }
            const balance = await libra.queryBalance(wallet.address)
            // console.log('wallet', wallet)
            response.wallet = wallet
            response.balance = balance
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
    // console.log(req.body)
    let serviceName = 'UM : Signin'
    let username = req.body.username || null
    let password = req.body.password || null
    let response = {}

    let results = await finduser.finduser(username)
    if(results.contents[0]!=null){
        response.message = `${serviceName} , Error : username or password have in database`;
        return res.status(200).send(response);
    }else{
        const libra = new LibraService()
        const createdResult = await libra.createWallet()
        let memMnemonic = createdResult.mnemonic
        const wallet = {
            address: createdResult.address,
            mnemonic: memMnemonic + ';1',
            balance: AMOUNT_TO_MINT.toString(10)
        }
        console.log('wallet', wallet)
        response.wallet = wallet
        const faucent = new Faucent()
        if (USE_KULAP_FAUCET) {
            await faucent.getFaucetFromKulap(AMOUNT_TO_MINT, createdResult.address)
        }else{
            console.log("Mint to testnet")
            await faucent.getFaucetFromLibraTestnet(AMOUNT_TO_MINT, createdResult.address)
        }
        await finduser.insertNewUser(username,md5(password))
        await finduser.insertNewMnemonic(username,wallet.address,memMnemonic)
    }
    console.log('req body', req.body)


    results = await finduser.getall_User()
    response.results =results
    return res.status(200).send(response)

}