import { web3 } from './uportSetup'

function OpenSignContractSetup () {
  /*let OpenSignABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"id","type":"bytes"},{"name":"ipfs","type":"bytes"}],"name":"addDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes"}],"name":"signDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"documents","outputs":[{"name":"timestamp","type":"uint256"},{"name":"ipfs_hash","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes"}],"name":"getSignatures","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"users","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"}])*/
  let OpenSignABI = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"documents","outputs":[{"name":"timestamp","type":"uint256"},{"name":"ipfs_hash","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"users","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes"}],"name":"getSignatures","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getMyDocumentByAddress","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes"},{"name":"ipfs","type":"bytes"}],"name":"addDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes"}],"name":"signDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"bytes"}],"name":"getMyDocumentById","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"}])
  //let OpenSignContractObj = OpenSignABI.at('0x0a91de6d1b6810786f0e93f22e63267855f43a01') // ropsten
  //let OpenSignContractObj = OpenSignABI.at('0x905e09998ec02b9074a27d88cf504359ac79756b') // rinkeby
  let OpenSignContractObj = OpenSignABI.at('0xf22962db0447b9410087b8f960865ccbfd353bf5') // rinkeby with new function myDocument
  
  
  
  return OpenSignContractObj
}

const OpenSignContract = OpenSignContractSetup()

export default OpenSignContract
