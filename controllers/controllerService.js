const finduser = require('../models/m_user')
const LibraService = require('../service_libra/libra_service')

module.exports.transfer = async (req,res) => {
    let serviceName = 'Libra service : mint'
    let response = {}
    let username = req.body.username
    let address_receive = req.body.address_receive
    let coin_amount = req.body.coin_amount

    const libra = new LibraService()
    
    // let fromAddress = req.body.fromAddress

    let result_mnemonic = await finduser.findmnemonic(username)
    let mnemonics = {}
    mnemonics.mnemonic = result_mnemonic.contents[0].mnemonic

    const mnemonic = mnemonics.mnemonic.split(';')[0]
    const result = await libra.transfer(mnemonic, address_receive, coin_amount)
    const wallet = {
      address: result.address,
      address_receive: toAddress,
      coin_amount: amount
    }
    console.log('wallet', wallet)

    return res.status(200).send(wallet)
}