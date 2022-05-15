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
    <main className={styles.main}>
      <div className={styles.left_main}>
        <AuthCheck>

        <div className={styles.main_grid}>
          <div className={styles.links_community}
            <LinkList links={links}/>
          </div>
        </div>  
        <PostFeed posts={posts}/>
        </AuthCheck>
      </div>
      <CommunityBar/>
    </main>
  )
}

