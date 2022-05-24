const abi = require('../abi/KaliAccessManagerV2.json')

export default function kaliAccessManager(address, web3) {
  let accessManager = new web3.eth.Contract(abi, address)
  return accessManager
}
