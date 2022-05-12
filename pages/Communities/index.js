import React, {useState} from 'react'
import CreateCommunity from '@components/forms/CreateCommunity'
import styles from './styles.module.scss'

export default function Communities() {

  const [create, setCreateStatus] = useState(false);

  return (
    <div className={styles.wrapper}>
      communities

      {
        create ?
        <CreateCommunity />
        :
        ''
      }

      <button onClick={() => {setCreateStatus(true)}}>
        Create community
      </button>
    </div>
  )
}
