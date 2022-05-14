import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditProfileModal from './EditProfileModal';
import { UserContext } from "../../../lib/context";
import { LinkList } from '../LinkList';
import { WalletEthers } from '@components/helpers/ConnectWallet';
import styles from './styles.module.scss';
import CreateLink from '../CreateLink';
import ReactMarkdown from 'react-markdown';

// UI component for user profile
export default function UserProfile({ user, links }) {
  const { username } = useContext(UserContext);
  const router = useRouter();
  const admin = router.query;

  const [editor, setEditor] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    if(admin.username === username){
      setEditor(true)
    }
  }, [])

  return (
    <div className={styles.profile}>
      <div className={styles.banner}>
        {
          user?.banner.slice(0, 4) === '![alt]' ?
          <ReactMarkdown>{`![alt]${user?.banner}`}</ReactMarkdown>
          :
          <img src={user?.banner}></img>
        }
      </div>
 
      <div className={styles.pfp}>
        {
          user?.photoURL.slice(0, 4) === '![alt]' ?
          <ReactMarkdown>{`![alt]${user?.photoURL}`}</ReactMarkdown>
          :
          <img src={user?.photoURL}></img>
        }
      </div>

      <div className={styles.profileGrid}>
        <main>
          <h1>{user.displayName || 'Anonymous User'}</h1>
          <p>
            <i>@{user.username}</i>
          </p>
        </main>

        <a href={"https://www.google.com"} target={"_blank"}> google.com </a>
      </div>
      
      <div className={styles.toolbar}>        
        {
          editor && user.network !== "" ?
          ''
          :
          editor && user.network === "" ? 
          <button class="subscribe-user-profile"><b>Connect Wallet</b></button>
          :
          <button class="subscribe-user-profile"><b>Donate</b></button>
        }

        {
          editor ? 
          <>
            <button onClick={() => setEditOpen(true)}>Edit</button> 
            <WalletEthers />
          </>

          : 
          ''
        }
      </div>

      {
        editOpen ? 
        <EditProfileModal user={user} handleOnClick={() => setEditOpen(false)}/>
        :
        ''
      }

      <p className={styles.bio}>
        {user?.bio}
      </p>

      <div className={styles.main_grid}>
        {
          editor ?  <CreateLink /> : ''
        }
       
        <LinkList links={links}/>

      </div>
      
    </div>
  );
}
