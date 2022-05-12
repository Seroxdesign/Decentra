import React from 'react'
import ImageUploader from '@components/layout/ImageUploader'
import styles from './styles.module.scss'

export default function CreateCommunity() {

  const createCommunity = () => {
    ''
  }

  return (
    <div className={styles.form_bg}>
      <form onSubmit={createCommunity} className={styles.create_form}>
        <div>
          <h4>Create a community</h4>
        </div>
        <hr />
        <label>Name</label>
        <input
          value={''}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
          className={styles.input}
        />
        <label>About</label>

        <input
          value={''}
          onChange={(e) => setLink(e.target.value)}
          placeholder="about"
          className={styles.input}
        />

        <ImageUploader placeImage={'setIcon'}/>

        <div className={styles.btns}>
          <button className={styles.cancel}>
            cancel
          </button>

          <button type="submit" className={styles.approve}>
            Create New Link
          </button>
        </div>
      
      </form>
    </div>
  )
}
