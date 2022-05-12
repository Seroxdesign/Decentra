import React from 'react'
import CommunityBar from '@components/layout/CommunityBar';
import AuthCheck from '@components/helpers/AuthCheck';
import styles from './styles.module.css'

export default function PageWrapper(props) {
  return (
    <div className={styles.container}>

      <div className={styles.inner_container}>
        <div className={styles.main_container}>
        {props.children}
        </div>
      </div>
    </div>
  )
}
