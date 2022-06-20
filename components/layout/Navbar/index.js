import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@lib/context';
import { auth, firestore, serverTimestamp } from '@lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import styles from './styles.module.scss'

// Top navbar
export default function Navbar() {
  const { username, user, member } = useContext(UserContext);

  const [mobileMenu, toggleMenu] = useState(false)
  
  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  const joinDecentra = async() => {
    const userCommunityDoc = firestore.doc(`users/${user.uid}/communities/decentra`);
    const groupDoc = firestore.doc(`community/decentra/members/${user.uid}`);
    const userDoc = firestore.doc(`users/${user.uid}`)

    const batch = firestore.batch();
    batch.set(userCommunityDoc, {joinedAt: serverTimestamp(), community: 'Decentra'});
    batch.set(groupDoc, { uid: user.uid, name: user.displayName, joinedAt: serverTimestamp(), username: username, });
    batch.update(userDoc, { joinedDecentra: true });

    await batch.commit();

    toast.success('Welcome to Decentra. You have now become a member of our community.')
  }

  return (
    <nav className={styles.navbar}>
   <div className={user ? styles.communityexplorer : styles.invisible}>
    <a>💬</a>
    <a>💸</a>
    <a>✨</a>
    <a>✨</a>
    <a href={`/${username}`}>👥</a>
    {
          mobileMenu ? 
          <button className={styles.mobile_control} onClick={() => {toggleMenu(false)}}>
            <img src="https://i.imgur.com/DbfV65K.png" alt="close mobile menu"/>
          </button>
          :
          <button className={styles.mobile_control} onClick={() => {toggleMenu(true)}}>
            <img src="https://i.imgur.com/rhTxXmI.png" alt="open mobile menu"/>
          </button>
        }
    </div>
   <div
    className={user ? styles.communityleftbar : styles.invisible}
   >
      <div className={styles.communityname}>
        <h3>Decentra</h3>
      </div>
      <div className={styles.userspace}>
        <img src="https://i.ibb.co/8KyXHCk/k-LRh4bm-Y-400x400.jpg"></img>
        <div>
        <b>{username}</b>
        </div>
      </div>
     <div className={styles.communityinfo}>
        <b>The all-in-one community platform</b>
        {
          member ? 
          'You are a member'
          :
          <div className={styles.communityjoin} onClick={joinDecentra}>
            <b>Join community</b>
          </div>
        }
      
      </div>
      <ul className={styles.ul} >
        {/* user is signed-in and has username */}
        {username && (
          <div className={ mobileMenu ? styles.mobile_wrap : styles.links}>
          <button onClick={()=> {toggleMenu(false)}} className={styles.close}>Close</button>
           <div className={styles.ul_universal}>
             {
               username ? 
              <a href="/">
               <li className={styles.li}>
                  <div className={styles.link_btn}>
                  🏡
                </div>
                <a>Home</a>
              </li>
             </a> 
              :
              ''
             }
          <a href={`/${username}`}>
           <div className={styles.li}>
              <img src={user.photoURL} className={styles.link_btn}></img>
              <b>{username}</b>
            </div>
           </a> 

            <div className={styles.category_name}><b>Get Started</b></div>
     
              <Link href="/Chat">
                <div className={styles.li}>
                  <div className={styles.link_btn}>
                    📜
                  </div>
                  <p>Chat</p>
                </div>
              </Link>

              <Link href="/Web3">
                <div className={styles.li}>
                    <div className={styles.link_btn}>
                      💸
                    </div>
                    <p>Wallet</p>
                </div>
              </Link>

              <Link href="/announcements">
                <div className={styles.li}>
                    <div className={styles.link_btn}>
                      📢
                    </div>
                    <p>Announcements</p>
                </div>
              </Link>

              <Link href="/our-team">   
                <div className={styles.li}>
                  <div className={styles.link_btn}>
                    👥
                  </div>
                  <p>Our team</p>
                </div>
              </Link>
        
           </div>
          <div className={styles.category_name}><b>Resources</b></div>
           <ul className={styles.ul_community_specific}>
             <li className={styles.li}>
              <Link href="/blog">
                <div className={styles.link_btn}>
                   📰
                </div>
              </Link>
              <a>Blog</a>
            </li>
            <li className={styles.li}>
              <Link href="/guides">
                <div className={styles.link_btn}>
                   📚
                </div>
              </Link>
              <a>Guides</a>
            </li>
           </ul>
          </div>
        )}
      <ul className={styles.ulmobile}>
        {
          mobileMenu ? 
          <button className={styles.mobile_control} onClick={() => {toggleMenu(false)}}>
            <img src="https://i.imgur.com/DbfV65K.png" alt="close mobile menu"/>
          </button>
          :
          <button className={styles.mobile_control} onClick={() => {toggleMenu(true)}}>
            <img src="https://i.imgur.com/rhTxXmI.png" alt="open mobile menu"/>
          </button>
        }
          <Link href="/">
            <button className={styles.mobile_control}>
              🏡
            </button>
          </Link>
        
          <Link href={"/Chat"}>
            <button className={styles.mobile_control}>
              💬
            </button>
          </Link>

           
          <Link href={"/Web3"}>
            <button className={styles.mobile_control}>
              💸
            </button>
          </Link>
  
  
          <Link href={`/${username}`}>
            <button className={styles.mobile_control}>
              👥
            </button>
          </Link>
       </ul>
        {/* user is not signed OR has not created username */}
      
      </ul>
   </div>   
    </nav>
  );
}
