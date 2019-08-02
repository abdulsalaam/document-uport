import { Connect, SimpleSigner } from 'uport-connect'

/*const uport = new Connect('uPort Demo', {
  clientId: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  signer: SimpleSigner('c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2')
})*/

const uport = new Connect('Abdul Uport Dapp', {
      clientId: '2oo5zA2F4kPghE4hF9QGWacB1tx6KLvcQQ7',
      network: 'rinkeby',
      signer: SimpleSigner('29d795c51c839ef9569f4268ae7a9bde7fddb8e13ad9136b175a1ee07a92cc6a')
    })

const web3 = uport.getWeb3()
export { web3, uport }
