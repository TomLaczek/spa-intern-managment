import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  created(){
    this.$store.dispatch("countPages")
  },
  render: h => h(App)
}).$mount('#app')
