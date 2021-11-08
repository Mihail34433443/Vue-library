import Firebase from 'firebase/compat/app'
import 'firebase/firestore'

function initFirebase() {
  Firebase.initializeApp({
    apiKey: "AIzaSyB7sWQiAPFbEXH6tpPpwTwBEXtfwBxaGuQ",
    authDomain: "library-d7342.firebaseapp.com",
    databaseURL: "https://library-d7342-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "library-d7342",
    storageBucket: "library-d7342.appspot.com",
    messagingSenderId: "431271459810",
    appId: "1:431271459810:web:6d8b9ec5233759138a17bb",
    measurementId: "G-CLHHBCSH0X"
  })
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }
