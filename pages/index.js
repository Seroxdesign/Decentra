import PostFeed from '@components/layout/PostFeed';
import { useAddress, useDisconnect, useMetamask, useNetworkMismatch } from '@thirdweb-dev/react';
import { firestore,  postToJSON } from '@lib/firebase';
import CommunityBar from '@components/layout/CommunityBar'
import AuthCheck from '@components/helpers/AuthCheck';
import { LinkList } from '@components/layout/LinkList';
import styles from './styles.module.scss'

const LIMIT = 5

export async function getServerSideProps(context){
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON)

  const linkQuery = firestore
    .collectionGroup('communityLinks')

  const links = (await linkQuery.get()).docs.map(postToJSON)

  return {
    props: {posts, links},
  }
}

export default function index({posts, links}) {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const isMismatched = useNetworkMismatch();
  return (
    <main className={styles.main}>
      <div className={styles.left_main}>
        <AuthCheck>
        <div className={styles.wallet}>
          {address ? (
            <>
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
              <p>Your address: {address}</p>
              {isMismatched ? (
                <div style={{ fontSize: "20px", fontFamily: "arial" }}>Please switch to the Mumbai network</div>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            // <button onClick={connectWithMetamask}>Connect with Metamask</button>
            <button className={styles.special_button} onClick={connectWithMetamask}><img src="https://i.ibb.co/FX9hrjH/3845819.png" alt="connect-web3-wallet" /></button>
          )}
        </div>
        <div className={styles.main_grid}>
          <LinkList links={links}/>
        </div>  
        <PostFeed posts={posts}/>
        </AuthCheck>
      </div>
      <CommunityBar/>
    </main>
  )
}

