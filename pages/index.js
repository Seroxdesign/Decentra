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
<div className={communityrules}>
    <div className={styles.communityrule}>
      <h1>1</h1>
      <a>Be Excellent to Each Other</a>
      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down  css-1570kgy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 15px;min-width: 15px;"><path fill="currentColor" d="M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z"></path></svg>
    </div>
</div>
  </div>
  </div>
 </div>
  )
}

