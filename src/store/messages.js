export default {
  state: {
    message: {}
  },
  mutations: {
    test(state, message) {
      state.message = message
    },
    deleteMessage(state) {
      state.message = null
    },
  },
  actions: {
    addMessage({ dispatch, commit }, message) {
      commit('test', message)
      setTimeout(() => {
        commit("deleteMessage")
      }, 2000)
    },
  },
  getters: {
    message: s => s.message
  },
}