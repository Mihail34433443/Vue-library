import firebase from "firebase/compat/app"
import { transferInCart } from "../helpers/localStorageLogin"

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await transferInCart()
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async register({ dispatch }, { email, password, phone, fio }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.firestore().collection('users').doc(uid).collection('info').add({
          phone: phone,
          fio: fio,
          role: 'user',
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
