// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8ei3VxtpWH_BBgbscd7IoF_tSYXxUMec',
  authDomain: 'functy-49aee.firebaseapp.com',
  projectId: 'functy-49aee',
  storageBucket: 'functy-49aee.appspot.com',
  messagingSenderId: '835510171475',
  appId: '1:835510171475:web:4b15118857a63ecb0e13a6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore }