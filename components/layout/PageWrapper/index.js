import React from 'react'
import CommunityBar from '@components/layout/CommunityBar';
import AuthCheck from '@components/helpers/AuthCheck';
import styles from './styles.module.css'

export default function PageWrapper(props) {
  return (
    <div className={styles.container}>
  
<div className={styles.horizontal_navbar}>
  <div className={styles.horizontal_navbarcontent}>
   <div className={styles.active_communitylogo}></div>
    <a className={styles.active_communityname}>Decentra</a>
   </div>
   <div className={styles.searchbar_wrapper}>
    <button className={styles.searchbar}>Search</button>
   </div>
 <div className={styles.horizontal_navbarcontentright}>
    <a href="Admin">
      <button className={styles.createpost}>+ Create</button>
      <button className={styles.createpostmobile}>+</button>
    </a>
    <div className={styles.active_directmessages}/>
    <div className={styles.active_notifications}/>
  
   <div className={styles.horizontal_navbarcontentlogin}>
    <div className={styles.active_login}/>
    <a>Log In</a>
   </div>

 </div>

</div>

      <div className={styles.inner_container}>
        <div className={styles.main_container}>
        {props.children}
        </div>
      </div>
    </div>
  )
}
