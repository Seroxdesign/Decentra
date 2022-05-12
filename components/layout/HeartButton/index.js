import { firestore, auth } from '../../../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";

export default function Heart({postRef}) {
  const heartRef = doc(getFirestore(), postRef.path, 'hearts', auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(getFirestore());

    batch.update(postRef, {heartCount: increment(1)});
    batch.set(heartRef, {uid});

    await batch.commit();
  }

  const removeHeart = async () => {
    const batch = writeBatch(getFirestore());

    batch.update(postRef, {heartCount: increment(-1)});
    batch.delete(heartRef);
    await batch.commit();
  }

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>Unheart</button>
  ) : (
    <button onClick={addHeart}>Heart</button>
  );
};