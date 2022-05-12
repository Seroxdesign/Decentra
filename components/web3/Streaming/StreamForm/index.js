import React, { useState } from 'react';
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
  RICAddress,
} from '../../constants/polygon_config'
import { blockInvalidChar } from '../../../../utils/web3/blockInvalidChars'
import { calculateFlowRate } from '../../../../utils/web3/calculateFlowRate';
import styles from './styles.module.scss';

export const StreamForm = ({
  createFlow,
  updateRecipient,
  updateFlowRate,
  updateSuperToken,
  loading,
}) => {
  const [addressProvided, setAddressStatus] = useState(false);
  const [flowProvided, setFlowStatus] = useState(false);
  const [tokenProvided, setTokenStatus] = useState(false);
  
  const supportedCurrencies = [ 
    {
      currency: 'DAIx',
      address: DAIxAddress,
    },

    {
      currency: 'USDCx',
      address: USDCxAddress,
    },

    {
      currency: 'WETHx',
      address: WETHxAddress,
    },

    {
      currency: 'MKRx',
      address: MKRxAddress,
    },

    {
      currency: 'WBTCx',
      address: WBTCxAddress,
    },

    {
      currency: 'MATICx',
      address: MATICxAddress,
    },

    {
      currency: 'SUSHIx',
      address: SUSHIxAddress,
    },

    {
      currency: 'IDLEx',
      address: IDLExAddress,
    },

    {
      currency: 'RIC',
      address: RICAddress,
    },
  ];


  return (
    <div className={styles.stream_form}>
      <div className={styles.input_container}>
        <label htmlFor="recipient" className={styles.input_label}>Wallet Address here</label>
        <input
          className={styles.input_field}
          type="text"
          id="recipient"
          placeholder="Receiver Address" 
          onChange={async (e) => { 
            if ((e.target.value).length === 42) {
              await updateRecipient(e.target.value); 
              setAddressStatus(true);
            }
          }}
        />
      </div>

      <div>
        <label className={styles.input_label} htmlFor="payment">
          Payment monthly
        </label>
        <input
          id="payment"
          className={styles.input_field} 
          type="number" 
          placeholder="Payment Amount Per month in" 
          onKeyDown={blockInvalidChar}
          min={0}
          onChange={async (e) => { 
            const newFlow = await calculateFlowRate(+(e.target.value));
            if (newFlow) {
              await updateFlowRate(newFlow.toString());
              setFlowStatus(true);
            }
          }}
        />
      </div>

      <div>
        <label className={styles.input_label} htmlFor="supertoken">Supertoken</label>
        <select
          name="SuperTokens" 
          id="supertoken"
          onChange={async (e) => { 
            await updateSuperToken(e.target.value); 
            setTokenStatus(true);
          }} 
          className={styles.input_field}
        >
          <option value="" selected>Choose A Token</option>
          {
            
            supportedCurrencies.map((currency) => {
             

              return <option value={`${currency.address}`}>{currency.currency}</option>;
            
            })
            
          }
        </select>
      </div>
    
      <button 
        className={styles.input_field_submit} 
        disabled={!addressProvided || !flowProvided || !tokenProvided}
        onClick={() => { createFlow(); }}
      >
        {loading ? 'loading' : 'Create Stream'}
      </button>
    </div>
  );
};