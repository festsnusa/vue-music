import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAig83mTqJXnco637hmNKXP0W0u0pIK6Gc",
  authDomain: "music-5c3a5.firebaseapp.com",
  projectId: "music-5c3a5",
  storageBucket: "music-5c3a5.appspot.com",
  messagingSenderId: "1051410494655",
  appId: "1:1051410494655:web:68b57c5b2cdac1a40fc20a"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage
}