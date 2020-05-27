import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name: 'AddIntern',
    component: () => import(/*webpackChunkName:"edit-intern"*/ '../views/AddIntern.vue'),
  },
  {
    path:'/intern-list',
    name:'InternList',
    component: () => import(/*webpackChunkName:"edit-intern"*/ '../views/InternList.vue')
  },
  {
    path:'/edit/:intern_id',
    name:'EditIntern',
    component: () => import(/*webpackChunkName:"edit-intern"*/ '../views/EditIntern.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
