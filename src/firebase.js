// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYvdgXN_lZzruAsD9pzm6-y7SBQWA1s-A',
  authDomain: 'fm-interactive-comments-1c5cc.firebaseapp.com',
  projectId: 'fm-interactive-comments-1c5cc',
  storageBucket: 'fm-interactive-comments-1c5cc.appspot.com',
  messagingSenderId: '947470322318',
  appId: '1:947470322318:web:84a073f7f677d4925e57df',
  measurementId: 'G-T7Z9S5XDB4',
}

// Initialize Firebase
const app = !getApps().lenth ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()

export { app, auth, db, provider }
