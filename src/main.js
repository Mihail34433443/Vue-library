import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyB7sWQiAPFbEXH6tpPpwTwBEXtfwBxaGuQ",
  authDomain: "library-d7342.firebaseapp.com",
  databaseURL: "https://library-d7342-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-d7342",
  storageBucket: "library-d7342.appspot.com",
  messagingSenderId: "431271459810",
  appId: "1:431271459810:web:6d8b9ec5233759138a17bb",
  measurementId: "G-CLHHBCSH0X"
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export const db = firebase.firestore()
