import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './user-info'
import messages from './messages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    info,
    messages,
  },
})
