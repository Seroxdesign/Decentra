import React from 'react'
import styles from './styles.module.scss'

export default function FeedTab({ setTab, links, posts, images, events}) {

  const tabs = [links, posts, images, events]
  console.log(tabs)
  return (
    <div className={styles.container}>
      <ul>
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
