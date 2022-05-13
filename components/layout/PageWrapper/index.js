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
  </div>

      <div className={styles.inner_container}>
        <div className={styles.main_container}>
        {props.children}
        </div>
      </div>
    </div>
  )
}
