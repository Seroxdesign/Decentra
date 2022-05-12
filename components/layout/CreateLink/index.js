import React from 'react'
import { useRouter } from 'next/router'
import { firestore, auth } from '@lib/firebase';
import { serverTimestamp, query, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore';

import { useContext, useState } from 'react';
import { UserContext } from '@lib/context';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import styles from './styles.module.scss'
import ImageUploader from '../ImageUploader';


function CreateNewLink(props){
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState('');

   // Ensure slug is URL safe
   const slug = encodeURI(kebabCase(title));

   // Validate length
   const isValid = title.length > 3 && title.length < 100 && link.length != 0 && icon.length != 0;
 
   // Create a new post in firestore
   const createLink = async (e) => {
     e.preventDefault();
     const uid = auth.currentUser.uid;
     const ref = doc(getFirestore(), 'users', uid, 'links', slug);
 
     // Tip: give all fields a default value here
     const data = {
       title,
       slug,
       uid,
       username,
       link,
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp(),
       icon,
     };
 
     await setDoc(ref, data);

     props.toggle()
 
     toast.success('Link created!');
   };

   return (
    <div className={styles.form_bg}>
      <form onSubmit={createLink} className={styles.create_form}>
        <div>
          <h4>Add link</h4>
        </div>
        <hr />
        <label>Name</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
          className={styles.input}
        />
        <label>Link</label>

        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="link"
          className={styles.input}
        />

        <ImageUploader placeImage={setIcon}/>

        <div className={styles.btns}>
          <button onClick={props.toggle} className={styles.cancel}>
            cancel
          </button>

          <button type="submit" disabled={!isValid} className={styles.approve}>
            Create New Link
          </button>
        </div>
       
      </form>
    </div>
  );
}

export default function CreateLink() {

  const [createLink, toggleCreate] = useState(false)

  return (
    <div className={styles.link_maker}>
      {
      createLink ? 
        <CreateNewLink toggle={() =>{toggleCreate(false)}}/>
        :
        <button onClick={() => {toggleCreate(true)}} className={styles.newBtn}>+</button>
      }
    </div>
  )
}