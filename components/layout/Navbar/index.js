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
      <ul className={styles.ul}>
        {/* user is signed-in and has username */}
        {username && (
          <div className={ mobileMenu ? styles.mobile_wrap : styles.links}>
           <ul className={styles.ul_universal}>
             {
               username ? 

               <li className={styles.li}>
                <Link href={`/${username}`}>
                  <button className={styles.link_btn}>
                  🏡
                </button>
                </Link>
                <a>Home</a>
              </li>
              :
              ''
             }
           <li className={styles.li}>
              <Link href="/messages">
                <button className={styles.link_btn}>
                  📅
                </button>
              </Link>
              <a>Events</a>
            </li>
            <div className={styles.category_name}><b>General</b></div>
            <li className={styles.li}>
              <Link href="/bookmarks">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/JC84QnL/bookmark.png" alt="Bookmarks"></img>
                </button>
              </Link>
              <a>Bookmarks</a>
            </li>
            <li className={styles.li}>
              <Link href="/settings">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/LS4kHrx/settings-2.png" alt="Settings"></img>
                </button>
              </Link>
              <a>Settings</a>
            </li>
           </ul>
            <div className={styles.category_name}><b>Resources</b></div>
           <ul className={styles.ul_community_specific}>
             <li className={styles.li}>
              <Link href="/Admin">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/f4VvhFp/house.png" alt="Create"></img>
                </button>
              </Link>
              <a>Home</a>
            </li>
            <li className={styles.li}>
              <Link href="/">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/7zhc5Vr/calendar.png" alt="Forum"/>
                </button>
              </Link>
              <a>Events</a>
            </li>
           </ul>
            <div className={styles.seperator}/>
           <ul className={styles.ul_decentra_community}> 
           <li className={styles.li}>
              <Link href="/decentra">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/8KyXHCk/k-LRh4bm-Y-400x400.jpg" alt="decentra" />
                </button>
              </Link>
              <a>Decentra</a>
            </li>
           </ul>
           <ul className={styles.ul_joined_communities}> 
           </ul>
                       <div className={styles.seperator}/>
           <ul className={styles.ul_actions}> 

            <li className={styles.li}>
              <Link href="/Communities">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/HTTMKfN/add.png" alt="createcommunity" />
                </button>
              </Link>
              <a>Create community</a>
            </li>
            <li className={styles.li}>
              <Link href="/404">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/NFbsNZj/123123-Untitled.png" alt="discover" />
                </button>
              </Link>
              <a>Discover</a>
            </li>
           </ul> 
            <li className={styles.li}>
              <button onClick={signOutNow} className={styles.logout}>Log Out</button>
            </li>
          </div>
        )}

        {
          mobileMenu ? 
          <button className={styles.mobile_control} onClick={() => {toggleMenu(false)}}>
            <img src="https://i.imgur.com/DbfV65K.png" alt="close mobile menu"/>
          </button>
           <button className={styles.mobile_control}>
            🏡
          </button>
          :
          <button className={styles.mobile_control} onClick={() => {toggleMenu(true)}}>
            <img src="https://i.imgur.com/rhTxXmI.png" alt="open mobile menu"/>
          </button>
        }
        

        {/* user is not signed OR has not created username */}
      
      </ul>
    </nav>
  );
}
