import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const url = "https://reqres.in/api/users"

const items =  new Vuex.Store({
  state: {
    internList:[],
    editIntern:[]
  },
  mutations: {
    UPDATE_INTERN_DATA(state,internData){
      let index = state.internList.findIndex( intern => intern.id == internData.id)
      state.internList[index].first_name = internData.first_name;
      state.internList[index].last_name = internData.last_name;
      state.internList[index].avatar = internData.avatar;
    },
    GET_DATA_ONE_INTERN(state,internData){
      state.editIntern.push(internData);
    },
    PUSH_DATA_TO_ARRAY(state,responseData){
      responseData.map((internData)=>{
        state.internList.push(internData)
      })
    },
    NUMBER_OF_PAGES(state,data){
      state.pages=data
    },
    CLEAR_LIST(state){
      state.internList=[]
    }
  },
  actions: {
    addNewIntern(internData){
      return axios
        .post(url,internData)
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
    getOneIntern({commit},number){
      return axios
      .get(`${url}/${number}`)
      .then((response)=>{
        commit("GET_DATA_ONE_INTERN",response.data.data)
      })
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
    getIntern: (state) => (id) => {
      return state.internList.find( intern => intern.id === id)
    }
  }
})
export default items;