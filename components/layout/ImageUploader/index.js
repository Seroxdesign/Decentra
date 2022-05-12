import React, { useState } from 'react'
import {auth, storage, STATE_CHANGED} from '../../../lib/firebase'
import Loader from '../../simple/Loader'
import toast from 'react-hot-toast'
import styles from './styles.module.scss'

export default function ImageUploader({placeImage}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState(null)


  const uploadFile = async (e) => {
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];
  
    const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true)

    const task = ref.put(file);

    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);

      setProgress(pct)

      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
          placeImage(`![alt](${url})`)
        })
    })
    toast.success('Image uploaded successfully')
  }

  return (
    <>
      <div className={styles.uploader}>
        <Loader show={uploading}/>

        {uploading && <h3>{progress} %</h3>}

        {!uploading && (
          <>
            <label>
              Upload Image
            </label>
            <input type="file" onChange={uploadFile} disabled={downloadURL} accept="image/x-png,image/gif,image/jpeg" className={styles.input}/>
          </>
        )} 
      </div>
      {downloadURL && <div>Image uploaded successfully</div>}
    </>
   
  )
}
