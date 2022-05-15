import React, {useState} from 'react'
import Metatags from '../../components/helpers/metatags'
import UserProfile from '../../components/layout/UserProfile'
import PostFeed from '../../components/layout/PostFeed'
import { getUserWithUsername, postToJSON } from '../../lib/firebase'
import CreateLink from '@components/layout/CreateLink'
import AuthCheck from '@components/helpers/AuthCheck';
import { LinkList } from '@components/layout/LinkList'
import styles from './styles.module.scss'

export async function getServerSideProps({query}){

  const {username} = query;

  const userDoc = await getUserWithUsername(username)

  if(!userDoc){
    return {
      notFound: true,
    }
  }

  let user = null;
  let posts = null;
  let links = null;
  let images = null;


  if(userDoc) {
    console.log('working', userDoc)
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);

    const imagesQuery = userDoc.ref
      .collection('images')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(6);

    posts = (await postsQuery.get()).docs.map(postToJSON);

    images = (await imagesQuery.get()).docs.map(postToJSON)

    const linksQuery = userDoc.ref
        .collection('links')

    links=(await linksQuery.get()).docs.map(postToJSON)
  }  
  
  return {
    props: {user, posts, links, images},
  }
}



export default function UserProfilePage({ user, posts, links, images}) {
  console.log(links)
  
  return (
    <AuthCheck>
       <main className={styles.main}>
        <Metatags title={user.username} description={`${user.username}'s public profile`} />
        <UserProfile user={user} links={links} posts={posts} images={images}/>
      </main>
    </AuthCheck> 
  )
}
