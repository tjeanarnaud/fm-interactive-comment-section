// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: '947470322318',
  appId: `${process.env.FIREBASE_APP_ID}`,
  measurementId: 'G-T7Z9S5XDB4',
}

// Initialize Firebase
const app = !getApps().lenth ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()

export { app, auth, db, provider }
