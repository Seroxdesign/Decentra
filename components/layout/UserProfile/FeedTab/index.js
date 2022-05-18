import React from 'react'
import styles from './styles.module.scss'

export default function FeedTab({ setTab, posts, links, images, events}) {

  const tabs = [posts, links, images, events]
  console.log(tabs)
  return (
    <div className={styles.container}>
      <ul className={styles.profiletabs}>
        {
          tabs.map((tab, i) => {
            {console.log(tab)}

            return(
              <button className={styles.button} onClick={() => setTab(tab)}>{tab}</button>
            )
          })
        }
      </ul>
    </div>
  )
}
