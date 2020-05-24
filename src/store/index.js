import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:[],

  },
  mutations: {
    CREATE_USER_LIST(state,data){
      state.users=data
    }
  },
  actions: {
    loadPage({commit}, number){ 
      this.state.users=[];
      return axios
        .get(`https://reqres.in/api/users?page=${number}`)
        .then((response)=>{
          commit("CREATE_USER_LIST",response.data.data)
        })
    },
    createUser(){
      return axios
    }
  },
  modules: {
  },
  getters:{
    usersList(state){
      return state.users
    }
  }
})
