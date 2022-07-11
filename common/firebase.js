import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCDDTFgT3q2hrbl-VGeHwDVQS76FkBmAXg",
    authDomain: "dajhe-test.firebaseapp.com",
    projectId: "dajhe-test",
    storageBucket: "dajhe-test.appspot.com",
    messagingSenderId: "1035758477717",
    appId: "1:1035758477717:web:f17e063313b48fc387169c",
    measurementId: "G-97PV1MP6JQ"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;