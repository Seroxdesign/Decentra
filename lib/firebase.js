import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD-E1qiKtYRrj5jlHn8SNcXJ7ftERMGmQk",
  authDomain: "decentra-57bba.firebaseapp.com",
  projectId: "decentra-57bba",
  storageBucket: "decentra-57bba.appspot.com",
  messagingSenderId: "107025234334",
  appId: "1:107025234334:web:90769e87416e0c582f3e8f",
  measurementId: "G-DRPL41V7CG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const emailAuthProvider = new firebase.auth.EmailAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
};

export function awardsToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    joinedAt: data?.joinedAt.toMillis() || 0,
  };
};

export function surveyToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
  };
};