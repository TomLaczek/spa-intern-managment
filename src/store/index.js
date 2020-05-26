import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const url = "https://reqres.in/api/users"

export default new Vuex.Store({
  state: {
    internList:[],
    responseInformation:null,
  },
  mutations: {
    LAST_RESPONSE_INFORMATION(state,responseData){
      state.responseInformation = responseData;
    },
    PUSH_DATA_TO_ARRAY(state,responseData){
      responseData.map((internData)=>{
        state.internList.push(internData)
      })
      //state.internList.push(responseData)
    },
    NUMBER_OF_PAGES(state,data){
      state.pages=data
    }
  },
  actions: {
    addNewIntern({commit},internData){
      return axios
        .post(url,internData)
        .then((response)=>{
          console.log(response)
          commit("LAST_RESPONSE_INFORMATION",response)
        })
    },
    countPages({commit}){
      this.state.internList=[];
      return axios
        .get(url)
        .then((response)=>{
          commit("NUMBER_OF_PAGES", response.data.total_pages)
        })
    },
    downloadPageData({commit},number){
      return axios
        .get(url+`?page=${number}`)
        .then((response)=>{
          commit("PUSH_DATA_TO_ARRAY",response.data.data)
        })
    },
    createUser(){
      return axios
    }
  },
  modules: {
  },
  getters:{
    totalPages(state){
      return state.pages
    }, 
    internList(state){
      return state.internList
    },
  }
})
