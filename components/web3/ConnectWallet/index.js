import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import '@uniswap/widgets';
import { StreamContainer } from '@components/web3/Streaming/StreamContainer';
import { SwapWidget, Theme } from '@uniswap/widgets'
import styles from './styles.module.scss'

const theme = {
  backgroundColor: '#303030'
}

export default function Connect(){
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState()
  const [web3State, setState] = useState('swap')
  const [net, setNetwork] = useState('')
  const [provider, setProvider] = useState()

  const connectWallet = async () => {
    if(window.ethereum && currentAccount == null) {
      console.log('1')
      await setProvider(new ethers.providers.Web3Provider(window.ethereum))
      const accounts =""
      const network =""
      if (provider){
        network = await provider.getNetwork()
        accounts = await provider.send("eth_requestAccounts", []);
      }

      console.log(accounts)
      setCurrentAccount(accounts[0])
      setNetwork(network.name)
    }
    else{
      console.log('need to install metamask')
    }
  }

  useEffect(() => {
    if(currentAccount){
      provider.getBalance(currentAccount)
      .then(balanceResult => {
        setAccountBalance(ethers.utils.formatEther(balanceResult))
      })
    }else{
      connectWallet()
    };
  }, [currentAccount]);

  return (
    <div className={styles.connector}>

      {
        currentAccount ? 
        <h3>Connected</h3>
        :
        <>
          <h3>Connect your wallet</h3>

          <button onClick={connectWallet}>
            Connect
          </button>
        </>
      }

      {
        currentAccount && 
        <div className={styles.container}> 
          <div className={styles.info}>
            <h5>Wallet Address: {currentAccount}</h5>
            <br />
            <h5>Balance: {accountBalance}</h5> 
            <br />
            <h5>Network: {net}</h5>
            <div className={styles.btn_tab}>
              <button className={web3State === 'swap' ? styles.highlight : ''} onClick={() => {setState('swap')}}>
                Exchange
              </button>
              <button className={web3State === 'pay' ? styles.highlight : ''} onClick={() => {setState('pay')}}>
                Pay
              </button>
            </div>
          </div>
      
          {
            web3State === 'swap' ? 
            <SwapWidget
            provider={provider}
            jsonRpcEndpoint={'https://polygon-rpc.com/'}
            width={320}
            theme={theme}
          />
            :
            web3State === 'pay' ?
            <StreamContainer sender={currentAccount}/>
            :
            ''
          }
         
        </div>
      }
    </div>
  )
} 