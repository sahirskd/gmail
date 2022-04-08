import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABB8jF8sE42SUdD8zR_MjCFQtZ5j70I2c",
    authDomain: "app-9ff8e.firebaseapp.com",
    projectId: "app-9ff8e",
    storageBucket: "app-9ff8e.appspot.com",
    messagingSenderId: "897828236803",
    appId: "1:897828236803:web:cb30bd470e34786586a836",
    measurementId: "G-V1W7VWF391"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(firebaseApp);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storageRef = firebase.storage().ref();

export { db, auth, provider, storageRef };