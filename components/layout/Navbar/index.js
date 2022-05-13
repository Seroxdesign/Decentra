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

               <li className={styles.li_last}>
                <Link href={`/${username}`}>
                  <img src="https://i.imgur.com/CuDMssO.png" alt="profile" className={styles.profile_img} />
                </Link>
                <a>User profile</a>
              </li>
              :
              ''
             }
           
           </ul>
            <div className={styles.seperator}/>
           <ul className={styles.ul_community_specific}>
             <li className={styles.li}>
              <Link href="/Admin">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/GRgdJCy/kalender.png" alt="Create"></img>
                </button>
              </Link>
              <a>Create post</a>
            </li>
            <li className={styles.li}>
              <Link href="/">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/ZY6Z6Jx/tipps.png" alt="Forum"/>
                </button>
              </Link>
              <a>Settings</a>
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
           <ul className={styles.ul_actions}> 
            <li className={styles.li}>
              <Link href="/Communities">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/5rWyV5p/sahdasdjhasj.png" alt="createcommunity" />
                </button>
              </Link>
              <a>Create community</a>
            </li>
            <li className={styles.li}>
              <Link href="/404">
                <button className={styles.link_btn}>
                  <img src="https://i.ibb.co/37sVsBX/disco.png" alt="discover" />
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
          :
          <button className={styles.mobile_control} onClick={() => {toggleMenu(true)}}>
            <img src="https://i.imgur.com/rhTxXmI.png" alt="open mobile menu"/>
          </button>
        }
        

        {/* user is not signed OR has not created username */}
        {!username && (
          <li className={styles.li_profile}>
            <Link href="/Enter">
              <button>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
