import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'

import auth from './auth'
import info from './info'

import { Firebase, initFirebase } from '.././config/firebase.js'
import myModule from './modules/myModule.js'

Vue.use(Vuex)

const easyFirestore = VuexEasyFirestore(
  [myModule],
  { logging: true, FirebaseDependency: Firebase }
)

const storeData = {
  plugins: [easyFirestore],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    info,
  }
}

const store = new Vuex.Store(storeData)

initFirebase()
  .catch(error => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })

export default store
