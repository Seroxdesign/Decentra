import React, {useState} from 'react'
import { auth, firestore } from '../../../../lib/firebase';
import TextField from '@components/forms/assets/TextField';
import ImageUploader from '@components/layout/ImageUploader';
import toast from 'react-hot-toast';
import { WalletConnector } from '@components/web3/ConnectWallet';
import {useRouter} from 'next/router'
import styles from './styles.module.scss';
import ReactMarkdown from 'react-markdown';

const defaultValues = {
  name: '',
  bio: '',
  website: '',
  organization: '',
};

export default function EditProfileModal({user, handleOnClick}) {
  const [values, setValues] = useState(defaultValues)
  const { name, bio, website, organization} = values;
  const [icon, setIcon] = useState(`${user?.photoURL}`);
  const [banner, setBanner] = useState(`${user?.banner}`);
  
  const router = useRouter()

  console.log(user.uid)

  const onSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${uid}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.update(userDoc, { banner, photoURL: icon, displayName: name, bio, website, organization});

    await batch.commit();
    toast.success('Update successfully.')
    router.push(`/${user.username}`)
  };


  return (
    <div className={styles.profileModal}>

      <button onClick={handleOnClick} className={styles.close}>Close</button>

      <form className={styles.form} onSubmit={onSubmit}>
        <h3>Edit your profile</h3>
        <hr></hr>
        <div>
          <h4>Banner</h4>
          <ReactMarkdown>{user?.banner}</ReactMarkdown>
          <ImageUploader placeImage={setBanner}/>

          <h4>Profile Picture</h4>
          <img src={user?.photoURL} alt={`${user.displayName}'s image`}/>
          <ImageUploader placeImage={setIcon}/>
        </div>

        <div>
          <TextField 
            label={"Your Display Name Here"}
            placeholder={user?.displayName}
            onChange={(name) => setValues((prev) => ({
              ...prev,
              name
            }))}
            value={name}
          />

          <TextField 
            label={"Your bio here"}
            placeholder={"Introduce yourself"}
            onChange={(bio) => setValues((prev) => ({
              ...prev,
              bio
            }))}
            value={bio}
          />
        </div>

        <div>
          <TextField 
            type={"text"}
            label={"Your website url here"}
            placeholder={"Introduce yourself"}
            onChange={(website) => setValues((prev) => ({
              ...prev,
              website
            }))}
            value={website}
          />
        </div>

        
        <div>
          <TextField 
            type={"text"}
            label={"Your organization"}
            placeholder={"Ricochet Exchange"}
            onChange={(organization) => setValues((prev) => ({
              ...prev,
              organization
            }))}
            value={organization}
          />
        </div>

        <button >Save Changes</button>
      </form>

    </div>
  )
}
