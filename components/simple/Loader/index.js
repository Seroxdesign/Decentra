import React from 'react'
import styles from './styles.module.css'

export default function Loader( {show} ) {
  return show ? <div className={styles.loader}></div> : null;
}
