import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.scss'
// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className={styles.card}>   
      <div className={styles.kicker_nav}>Home / Blog / {post?.title}</div>  
      <h1 className={styles.title}>{post?.title}</h1>
      <h3 className={styles.subtitle}>{post?.subtitle}</h3>
      <div className={styles.small_title}>
        <div className={styles.userprofilepicture}>{post.user?.photoURL}
   </div>
    <div>
      <Link href={`/${post.username}/`}>
        <a className={styles.user_blog}>{post.username}</a>
      </Link>
      <div className={styles.publicationdate}>{createdAt.toISOString()}</div>
    </div>
  </div>
    <div className={styles.blogpostcontent}>
      <ReactMarkdown>{post?.icon}</ReactMarkdown>
      <div className={styles.postcontent}>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
    </div>      
  </div>
  );
}
