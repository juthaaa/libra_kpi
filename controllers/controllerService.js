const finduser = require('../models/m_user')
const LibraService = require('../service_libra/libra_service')
const axios = require('axios')

module.exports.transfer = async (req,res) => {
    let serviceName = 'Libra service : transfer'
    console.log(serviceName)
    let response = {}
    let username = req.body.username
    let address_receive = req.body.address_receive
    let address_sender = req.body.address_sender
    let coin_amount = req.body.coin_amount

    const libra = new LibraService()
    
    // let fromAddress = req.body.fromAddress

    let result_mnemonic = await finduser.findmnemonic(username)
    let mnemonic = result_mnemonic.contents[0].mnm_mnemonic
    mnemonic = mnemonic.split(';')[0]

    const balance = await libra.queryBalance(address_sender)
    let balances = parseInt(balance);
    // console.log("balance ",coin_amount,":",typeof(x))

    // console.log("mnemonic",mnemonic)
    if(coin_amount <= balances || balances == 0){
      const result = await libra.transfer(mnemonic, address_receive, coin_amount)
      // const wallet = {
      //   address: result.address,
      //   address_receive: address_receive,
      //   coin_amount: coin_amount
      // }
      response.status_text = "success"
    }else{
      response.status_text = "error"
      response.message = "balance insufficient"
    }
    // console.log("result_transfer",result)
    
    // console.log('wallet', wallet)

    return res.status(200).send(response)
}

module.exports.getbalance_account = async (req, res) => {
  let serviceName = `UM : getforDashboard`
  console.log(serviceName)
  let response = {}
  
  let address = req.body.address || null
  console.log(req.body)
  await axios.get('https://api-test.libexplorer.com/api?module=account&action=balance&address=' + address)
  .then(res => {
      // console.log("test :", res.data)
      response.balance = res.data.result / 1000000 //convert micorlibra => libra
  })
  return res.status(200).send(response)
}