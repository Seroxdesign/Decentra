import {auth} from '@lib/firebase'
import React from 'react'
import styles from './styles.module.scss'

export default function LogOutButton() {
  return (
    <button className={styles.signout} onClick={() => auth.signOut()}>
      Sign out
    </button>
  )
}
