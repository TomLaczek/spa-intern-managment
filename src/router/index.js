import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name: 'AddIntern',
    component: () => import(/*webpackChunkName:"add-intern"*/ '../views/AddIntern.vue'),
  },
  {
    path:'/intern-list',
    name:'InternList',
    component: () => import(/*webpackChunkName:"intern-list"*/ '../views/InternList.vue')
  },
  {
    path:'/edit/:intern_id',
    name:'EditIntern',
    component: () => import(/*webpackChunkName:"edit-intern"*/ '../views/EditIntern.vue'),
  },
  { 
    path: "*", 
    component: () => import(/*webpackChunkName:"page-not-found"*/ '../views/PageNotFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
