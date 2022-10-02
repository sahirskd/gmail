import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { firebaseConfig } from '../firebase-config';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(firebaseApp);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storageRef = firebase.storage().ref();

export { db, auth, provider, storageRef };