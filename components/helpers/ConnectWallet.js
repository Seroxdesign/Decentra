import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import styles from './styles.module.scss'

export const WalletEthers = ({connect, setNetwork}) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState()
  const [accountNetwork, setAccountNetwork] = useState()
  const [provider, setProvider] = useState()

  const connectWallet = async () => {
    if(window.ethereum && currentAccount == null) {
      console.log('1')
      await setProvider(new ethers.providers.Web3Provider(window.ethereum))
      const accounts =""
      const network =""
      if (provider){
        accounts = await provider.send("eth_requestAccounts", []);
        network = await provider.getNetwork()
      }

      console.log(accounts)
      setCurrentAccount(accounts[0])
      setAccountNetwork(network.name)
      connect(currentAccount)
      setNetwork(accountNetwork)
    }
    else{
      console.log('need to install metamask')
    }
  }

  useEffect(async() => {
    if(currentAccount){
      connect(currentAccount)
      setNetwork(accountNetwork)
      provider.getBalance(currentAccount)
      .then(balanceResult => {
        setAccountBalance(ethers.utils.formatEther(balanceResult))
      })
    }else{
      connectWallet()
    };
  }, [currentAccount]);

  return (
    <div className={styles.connecter}>
      <button onClick={connectWallet} className={styles.connect_wallet}>
        {currentAccount ? 'Connected' : 'connect' }
      </button>

      {
        currentAccount && 
        <div className={styles.hide}> 
          <h5>Address: {accountNetwork}</h5> <h5>Balance: {accountBalance}</h5>
        </div>
      }
    </div>
  )
}