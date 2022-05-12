import React from 'react'
import About from '@components/simple/CommunityBar/About'
import EventItem from '@components/simple/CommunityBar/EventItem'
import styles from './styles.module.scss'

export default function CommunityBar() {
  return (
    <div className={styles.bar}>
      <About />

      <div className={styles.events}>
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
      </div>

    </div>
  )
}
