import styles from './styles.module.scss';
import AuthCheck from '../../components/helpers/AuthCheck';
import { useState, } from 'react';
import ImageUploader from '../../components/layout/ImageUploader';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { deleteDoc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form'; 
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}


function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
    {post && (
      <>
        <section>
          <ReactMarkdown> {post?.icon} </ReactMarkdown>
          <h1>{post.title}</h1>
          <p>ID: {post.slug}</p>

          <PostForm postRef={postRef} defaultValues={post} preview={preview} />
        </section>

        <aside>
          <h3>Tools</h3>
          <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
          <Link href={`/${post.username}/${post.slug}`}>
            <button className="btn-blue">Live view</button>
          </Link>
        </aside>
      </>
    )}
  </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: 'onChange' });
  const [icon, setIcon] = useState('');
  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published, subtitle }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
      icon,
      subtitle,
    });

    reset({ content, published, subtitle });

    toast.success('Post updated successfully!')
    router.push('/')
  };

  return (
    <form onSubmit={handleSubmit(updatePost)} className={styles.postForm}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        
        <fieldset>
          <label>Subtitle</label>
          <input name="subtitle" type="text"  {...register("subtitle")} />
        </fieldset>

        <ImageUploader placeImage={setIcon}/>

        <ReactMarkdown>{icon}</ReactMarkdown>

        <div>

          <div className={styles.textTools}>
            <ul>

            </ul>
          </div>

          <textarea {...register(
          "content", {
            required: "content is required",
            maxLength: {
              value: 20000,
              message: 'content is too long'
            },
            minLength: {
              value: 10,
              message: 'content is too short'
            }
          })} />
        </div>
       
          <fieldset>
            <input className={styles.checkbox} name="published" type="checkbox"  {...register("published")} />
            <label >Published</label>
          </fieldset>

        <button className={styles.greenBtn} type="submit" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
        
      </div>
    </form>
  )
}


