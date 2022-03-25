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
    location: null,
    email: null,
    image: "",
    category:"",
    charitys: [],
    country:"",
    region:"",
    dob:null
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
        monthAmount: state.monthAmount,
        location: state.location,
        email: state.email,
        image: state.image,
        category:state.category,
        country:state.country,
        region:state.region,
        dob:state.dob
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
      state.email = currentUser.email;
      state.location = currentUser.location;
      state.image = currentUser.image;
      state.category = currentUser.category,
      state.country = currentUser.country,
      state.region = currentUser.region,
      state.dob = currentUser.dob
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
