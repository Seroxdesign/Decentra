import React, { useState, useCallback} from "react";
import { StreamForm } from "../StreamForm";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import styles from './styles.module.scss'

export const StreamContainer = ({sender}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [superToken, setSuperToken] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [PanelOpen, TogglePanel] = useState(false);
  const [transactionSuccess, ToggleTransaction] = useState(false);
  const [transactionFailed, ToggleFail] = useState(false);
  const [recentActivity, ToggleRecent] = useState(false);

  async function createNewFlow() {
    setIsLoading(true);
    if (window.ethereum) {
      // @ts-expect-error
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
  
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider,
      });

      const signer = provider.getSigner();
      console.log('1')
      try {
        console.log('2')
        const createFlowOperation = sf.cfaV1.createFlow({
          flowRate,
          receiver: recipient,
          superToken,
        });
        console.log('3')
        await createFlowOperation.exec(signer);
        console.log('4')
        ToggleTransaction(true);     
      } catch (e) {
        console.log(e);
        ToggleTransaction(false);
        ToggleFail(true);
      }
    }
    setIsLoading(false);
  }
  
  const handleStartStream = useCallback(() => {
    createNewFlow();
  }, [recipient, flowRate, superToken]);

  const updateFlowRate = (flow) => {
    setFlowRate(flow);
  };

  const updateRecipient = (address) => {
    setRecipient(address);
  };

  const updateSuperToken = (token) => {
    setSuperToken(token);
  };

  const renderStream = () => {
    if (!transactionSuccess && !transactionFailed && !recentActivity) {
      return (
        <div className={styles.stream_form_container}>
          <button 
            onClick={() => { 
              ToggleFail(false);
              ToggleTransaction(false);
              ToggleRecent(!recentActivity);
            }} 
            className={styles.recent_btn}
          >
            Recent Activity
          </button>
          <button 
            onClick={() => {
              TogglePanel(false); 
              ToggleFail(false);
              ToggleTransaction(false);
            }} 
            className={styles.close_btn}
          >
            close
          </button>

          <h2 className={styles.title}>Send Money</h2>
          <StreamForm 
            loading={isLoading} 
            updateRecipient={updateRecipient} 
            updateFlowRate={updateFlowRate} 
            updateSuperToken={updateSuperToken} 
            createFlow={handleStartStream}
          />
        </div>
      );
    }
    if (transactionSuccess && !recentActivity) {
      return (
        <div className={styles.stream_form_container}>   
          <>
            <h3 className={styles.success}>Success</h3>
            <h3 className={styles.result}>
              Your stream has been created, you can view or edit 
              your stream in the Activity Page.
            </h3>
            <button 
              onClick={() => { 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(!recentActivity);
              }} 
              className={styles.recent_btn}
            >
              Back
            </button>
          </>
        </div>
      );
    }
    if (transactionFailed && !recentActivity) {
      return (
        <>
          <button 
            onClick={() => {
              TogglePanel(false); 
              ToggleFail(false);
              ToggleTransaction(false);
            }} 
            className={styles.close_btn}
          >
            close
          </button>
          <h2 className={styles.warning}>
            Stream Failed
          </h2>
        </>
       
      );
    }
    if (recentActivity) {
      return (
        <div className={styles.stream_form_container}> 
          
          <>
            <button 
              onClick={() => { 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(!recentActivity);
              }} 
              className={styles.recent_btn}
            >
              Back
            </button>
            <button 
              onClick={() => {
                TogglePanel(false); 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(false);
              }} 
              className={styles.close_btn}
            >
              close
            </button>
          </>

        </div>
      );
    }
  };
 
  return (
    <>
      <div className={styles.stream_button_container}>
        <button 
          className={styles.stream_button} 
          onClick={() => { TogglePanel(!PanelOpen); }}
          disabled={!sender}
        >
          Send
        </button>  
      </div>

      {PanelOpen ? (
        <div className={styles.stream_panel_container}>
          {renderStream()}
        </div>
      )
        :
        ''}
    </>
  );
};