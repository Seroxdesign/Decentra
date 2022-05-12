import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './styles.module.scss'

export default function LinkItem({link}) {
  return (
    <a className={styles.link_block} href={`//${link.link}`} target="_blank">
      <div className={styles.icon}> <ReactMarkdown>{link?.icon}</ReactMarkdown>  </div>
      <h2>{link.title}</h2>
      <h5>{link.link}</h5>
    </a>
  )
}