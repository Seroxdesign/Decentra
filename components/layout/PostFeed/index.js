import * as React from 'react';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.scss'

export default function PostFeed({posts, admin}) {
    
  return (
    <div className={styles.long_block}>
      <h2>Feed</h2>
      { posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin}/>) : null }
    </div>
  )

}

function PostItem({post, admin = false}) {
  const wordCount = post?.content.trim().split(/\s+/g).length;

  const contentPreview = post?.content.trim().split(/\s+/g).map((word, i) => {
    let preview = [];
    if(i < 30 && word.length < 15){
      preview.push(word)
    }
    return preview
  })
  
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
   <a href={`/${post.username}/${post.slug}`}>   
    <div className={styles.card}>

      <div className={styles.content_preview}>
          
        <div className={styles.post_details}>
        <Link href={`/${post.username}`}>
           <a> 
            <img src="https://i.ibb.co/8KyXHCk/k-LRh4bm-Y-400x400.jpg"/>
           </a> 
        </Link>
        <Link href={`/${post.username}`}>
          <a>
            <strong>{post.username}</strong>
          </a>
        </Link>
        <span className={styles.publication_date}>May 13, 2022</span>
        </div>
          
        <Link href={`/${post.username}/${post.slug}`}>
          <h3>
            <a href={`/${post.username}/${post.slug}`}>{post.title}</a>
          </h3>
        </Link>
        
        <span className={styles.preview}>
          {post.subtitle}
        </span>
            
      </div>
      
      <ReactMarkdown>{post?.icon}</ReactMarkdown>

      <div className={styles.action}><span className={styles.count}>💗 {post.heartCount || 0}</span></div>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/Admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}

  </div>
 </a>  
  );
}
