import React from 'react'
import styles from './styles.module.scss'

export default function About() {
  return (
    <div className={styles.about_card}>
      <h3>Decentra</h3>

      <hr />
      <p>
        Online communities have increasingly become the place, where people spend the majority of their day. There is too much confusion, and a lack of true townhalls combining this space.
      </p>

      <div>
        <span>
          <img src="https://i.imgur.com/g84cmcH.png" alt="Members" className={styles.community}/>
          <a>213 members</a>
        </span>

          <span>
          <img src="https://i.imgur.com/VgBTWqn.png" alt="Online" />
          <a>17 members online</a>
        </span>
      </div>
    </div>
  )
}
