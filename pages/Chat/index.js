import React, {useState} from 'react';
import {auth, firestore, serverTimestamp} from '@lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import LogOutButton from '@components/simple/LogoutBtn';
import AuthCheck from '@components/helpers/AuthCheck';
import styles from './styles.module.scss';

export default function Chat() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName
    })

    setFormValue('');
    
  }

  return (
    <AuthCheck>
      <div>
        <LogOutButton />

    <main className={styles.main}>
      {messages && messages.map((msg) => <ChatMessage key={msg.id}  message={msg}/> )}
    </main>

      <span></span>
        <form onSubmit={sendMessage} className={styles.form}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write a message" />

          <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
      </div>
    </AuthCheck>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL, displayName} = props.message;

  const messageClass = uid === auth.currentUser.uid ? styles.sent : styles.received;


  return (
  <>
    <div className={messageClass}>
    <div className={styles.messageauthor}>  
      <h4>{displayName}</h4>
      <img src={photoURL} />
    </div>
      <p>{text}</p>
      
    </div>
  </>
  )
}
