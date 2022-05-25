import React, {useState} from 'react'
import CreateCommunity from '@components/forms/CreateCommunity'
import { firestore, postToJSON, } from '@lib/firebase'
import styles from './styles.module.scss'

export async function getServerSideProps(context){
  const communityQuery = firestore
    .collectionGroup('community')
    .where('public', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(10)

  const communities = (await communityQuery.get()).docs.map(postToJSON)

  return {
    props: {communities},
  }
}

export default function Communities({communities}) {

  const [create, setCreateStatus] = useState(false);

  return (
    <div className={styles.wrapper}>
    
      {
        create ?
        <CreateCommunity />
        :
        ''
      }
      <button onClick={() => {setCreateStatus(true)}}>
        Create community
      </button>

      <h2>communities</h2>
      
      {
        communities.map((community, i) => {
          const createdAt = typeof community?.createdAt === 'number' ? new Date(community.createdAt) : community.createdAt.toDate();
          return(
          <div className={styles.temp}>
            <h4>Name: {community.name}</h4>
            <h4>Created on: {createdAt.toISOString()}</h4>
          </div>
          )
          
        })
      }
    </div>
  )
}
