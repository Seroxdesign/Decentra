import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import '@uniswap/widgets';
import { StreamContainer } from '@components/web3/Streaming/StreamContainer';
import { SwapWidget } from '@uniswap/widgets'
import styles from './styles.module.scss'

export const WalletEthers = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState()
  const [provider, setProvider] = useState()

  const connectWallet = async () => {
    if(window.ethereum && currentAccount == null) {
      console.log('1')
      await setProvider(new ethers.providers.Web3Provider(window.ethereum))
      const accounts =""
      if (provider){
        accounts = await provider.send("eth_requestAccounts", []);
      }

      console.log(accounts)
      setCurrentAccount(accounts[0])
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
    <div className={styles.connecter}>
      <h3>Connect your wallet</h3>

      <button onClick={connectWallet}>
        Connect
      </button>

      {
        currentAccount && 
        <div> 
          <h5>Address: {currentAccount}</h5> <h5>Balance: {accountBalance}</h5> 
          <div className="Uniswap">
            <SwapWidget
              provider={provider}
              jsonRpcEndpoint={'https://polygon-rpc.com/'}
            />
            <StreamContainer sender={currentAccount}/>
          </div>
        </div>
      }
    </div>
  )
}