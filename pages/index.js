import PostFeed from '@components/layout/PostFeed';
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

  return (
   <div className={styles.outermain}> 
    <main className={styles.main}>
      <div className={styles.left_main}>
        <AuthCheck>

        <div className={styles.main_grid}>
            <LinkList links={links}/>
        </div>  
        <PostFeed posts={posts}/>
        </AuthCheck>
      </div>
      <CommunityBar/>
    </main>
  <div className={styles.rightsidebar}>
  <div className={styles.about_card}>
    <h3>About</h3>
    <p>Forum for talking to the developers. All messages in this channel must be addressed to the devs. Or not.</p>
  </div>
  <div className={styles.about_card}>
    <h3>Rules</h3>
<div className={styles.communityrules}>
    <div className={styles.communityrule}>
      <div className={styles.ruletext}>
      <h1>1</h1>
      <a>Be Excellent to Each Other</a>
</div>
<a>↓</a>
    </div>

<div className={styles.communityrule}>
      <div className={styles.ruletext}>
      <h1>2</h1>
      <a>No Spamming, Shilling, or Scamming</a>
</div>
<a>↓</a>
    </div>

<div className={styles.communityrule}>
      <div className={styles.ruletext}>
      <h1>3</h1>
      <a>No Manipulation</a>
</div>
<a>↓</a>
    </div>

<div className={styles.communityrule}>
      <div className={styles.ruletext}>
      <h1>4</h1>
      <a>See Something, Say Something</a>
</div>
<a>↓</a>
    </div>

<div className={styles.communityrule}>
      <div className={styles.ruletext}>
      <h1>5</h1>
      <a>Beware of Scams</a>
</div>
<a>↓</a>
    </div>

</div>
  </div>
  </div>
 </div>
  )
}

