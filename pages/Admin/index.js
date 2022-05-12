import AuthCheck from "../../components/helpers/AuthCheck";
import { UserContext } from "../../lib/context";
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '../../components/layout/PostFeed'
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import { useContext, useState } from 'react';
import styles from './styles.module.scss'

export default function AdminPostsPage(props) {
  return (
    <main className={styles.container}>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  )
}

function PostList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <div className={styles.admin_section}>
      <h1 className={styles.postManage}>Manage your Posts!</h1>
      <PostFeed posts={posts} admin/>
    </div>
  )
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }

    await ref.set(data);
    toast.success('Post created!')
    router.push(`/Admin/${slug}`);
  } 

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className={styles.btn}>
        Create New Post
      </button>
    </form>
  );
}