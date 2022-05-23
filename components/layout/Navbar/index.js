import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@lib/context';
import { auth } from '@lib/firebase';
import { signOut } from 'firebase/auth';
import styles from './styles.module.scss'

// Top navbar
export default function Navbar() {
  const { username } = useContext(UserContext);

  const [mobileMenu, toggleMenu] = useState(false)
  
  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  return (
    <nav className={styles.navbar}>
   <div className={styles.communityexplorer}>
    <a>💬</a>
    <a>💸</a>
    <a>✨</a>
    <a>✨</a>
    <a href={`/${username}`}>👥</a>
    </div>
   <div className={styles.communityleftbar}>
      <div className={styles.communityname}>
        <h3>Decentra</h3>
      </div>
      <div className={styles.userspace}>
        <img></img>
        <div>
        <b>${displayName}</b>
        <p>${username}</p>
        </div>
      </div>
     <div className={styles.communityinfo}>
        <a>The all-in-one community platform</a>
        <div className={styles.communityjoin}>
          <b>Join community</b>
        </div>
      </div>
      <ul className={styles.ul} >
        {/* user is signed-in and has username */}
        {username && (
          <div className={ mobileMenu ? styles.mobile_wrap : styles.links}>
          <button onClick={()=> {toggleMenu(false)}} className={styles.close}>Close</button>
           <ul className={styles.ul_universal}>
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
           <li className={styles.li}>
                <div className={styles.link_btn}>
                  📅
                </div>
              <a>Profile</a>
            </li>
           </a> 
            <div className={styles.category_name}><b>Get Started</b></div>
            <li className={styles.li}>
              <Link href="/our-mission">
                <div className={styles.link_btn}>
                   📜
                </div>
              </Link>
             <a>Our mission</a>
            </li>
            <li className={styles.li}>
              <Link href="/settings">
                <div className={styles.link_btn}>
                   🙋
                </div>
              </Link>
              <a>FAQ</a>
            </li>
            <li className={styles.li}>
              <Link href="/announcements">
                <div className={styles.link_btn}>
                   📢
                </div>
              </Link>
              <a>Announcements</a>
            </li>
            <li className={styles.li}>
              <Link href="/our-team">
                <div className={styles.link_btn}>
                   👥
                </div>
              </Link>
              <a>Our team</a>
            </li>
           </ul>
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
