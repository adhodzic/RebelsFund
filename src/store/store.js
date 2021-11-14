import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: -1,
    currentUser: [],
    charitys: []
  },
  getters:{
    getRole: state => {
      return state.role
    },
    getCharitys: state =>{
      return state.charitys
    },
    getCurrentUser: state =>{
      return state.currentUser
    }
  },
  mutations: {
    updateRole(state, {role}){
      state.role = role;
    },
    updateCharitys(state, {charitys}){
      state.charitys = charitys
    },
    setCurrentUser(state, {currentUser}){
      state.currentUser = currentUser
    }
  },
  actions: {
    updateRole ({commit}, role){
      commit('updateRole',{role})
    },
    updateCharitys ({commit}, charitys){
      commit('updateCharitys', {charitys})
    },
    setCurrentUser ({commit}, currentUser){
      commit('setCurrentUser', {currentUser})
    }
  },
  modules: {},
});
