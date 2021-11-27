import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: -1,
    name: null,
    adr: null,
    recievedAmount: null,
    monthAmount: null,
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
      let user = {
        name: state.name,
        adr: state.adr,
        recievedAmount: state.recievedAmount,
        monthAmount: state.monthAmount
      }
      return user
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
      state.name = currentUser.name;
      state.adr = currentUser.adr;
      state.recievedAmount = currentUser.recievedAmount;
      state.monthAmount = currentUser.monthAmount;
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
