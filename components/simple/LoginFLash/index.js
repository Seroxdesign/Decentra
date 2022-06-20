import React from 'react';
import Link from 'next/link'
import styles from './styles.module.scss';

export default function Flash() {
  return (
    <div className={styles.wrapper}>
      <h3>Decentra</h3>

      <img src="https://i.ibb.co/8KyXHCk/k-LRh4bm-Y-400x400.jpg" alt="Decentra-logo"/>

      <Link href={"/Login"}>
        <button>Login</button>
      </Link>
    </div>
  )
}
