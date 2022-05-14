import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '@lib/context';
import { auth, firestore } from '../../lib/firebase'
import { ethers } from 'ethers';
import toast from 'react-hot-toast'
import styles from './styles.module.scss'

export const WalletEthers = () => {
  const { network, address } = useContext(UserContext);
  const net = network;

  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState()
  const [accountNetwork, setAccountNetwork] = useState()
  const [provider, setProvider] = useState()

  const connectWallet = async (e) => {
   
    if(window.ethereum && currentAccount == null) {

      await setProvider(new ethers.providers.Web3Provider(window.ethereum))
      const accounts =""
      const network =""
      const balance =""
      if (provider){
        accounts = await provider.send("eth_requestAccounts", []);
        network = await provider.getNetwork()
        balance = await provider.getBalance(accounts[0])
        .then(balanceResult => {
          setAccountBalance(ethers.utils.formatEther(balanceResult))
        })
        console.log(net, network.name, address, accounts[0])

        if(net !== network || address !== accounts[0]){
          const uid = auth.currentUser.uid;
          // Create refs for both documents
          const userDoc = firestore.doc(`users/${uid}`);
      
          // Commit both docs together as a batch write.
          const batch = firestore.batch();
          batch.update(userDoc, {walletAddress: accounts[0], network: network.name});
          
          await batch.commit();
          console.log(accountBalance, accountNetwork)
          toast.success('Connected Wallet Successfully')
        }

        else{
          console.log('no')
        }
      
      }

      console.log(accounts)
      setCurrentAccount(accounts[0])
      setAccountNetwork(network.name)
    
    }
    else{
      console.log('error')
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])
 
  return (
    <div className={styles.connecter}>
      <button onClick={async() => await connectWallet()} className={styles.connect_wallet}>
        {currentAccount ? 'Connected' : 'connect wallet' }
      </button>
    </div>
  )
}