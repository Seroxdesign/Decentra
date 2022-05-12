import React, {useState} from 'react'

import styles from './styles.module.scss'

export default function EventItem() {

  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.event_accordion}>
      <div className={styles.preview_card}>
        <h4>Tue Apr 26th, 6:00 PM ETH</h4>
        <h3>Event Name</h3>
        <p>This is a preview for the event</p>
        <button onClick={() => {setExpanded(!expanded)}}>Expand</button>
      </div>

      <div className={styles.expanded}>
        {
          expanded ? 

          <>
            <p>
              More text here, hubba hubba hubba hubba
            </p> 

            <button>
              View
            </button>

            <button className={styles.attend}>
              Attend
            </button>
          </>
          
          : 
          ''
        }
      </div>
    </div>
  )
}
