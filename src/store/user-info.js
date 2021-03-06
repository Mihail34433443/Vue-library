import firebase from "firebase/compat/app"
import { transferInCart } from "../helpers/localStorageLogin"

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      const uid = await dispatch('getUid')
      await firebase.firestore().collection('users').doc(uid).collection('info').onSnapshot(snap => {
        snap.forEach(doc => {
          var info = {
            id: uid,
            fio: doc.data().fio,
            phone: doc.data().phone,
            role: doc.data().role,
          }
          commit('setInfo', info)
          if (info.role === 'user') {
            transferInCart(info.id, info.role)
          }
          localStorage.setItem('role', info.role)
        })
      })
    }
  },
  getters: {
    info: s => s.info
  },
}
