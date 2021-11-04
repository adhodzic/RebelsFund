import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import Vuex from 'vuex'
import drizzleVuePlugin from "@drizzle/vue-plugin"
import drizzleOptions from "./drizzleOptions"
import vuetify from './plugins/vuetify'

Vue.use(Vuetify)

Vue.use(Vuex)
Vue.use(drizzleVuePlugin, {store, drizzleOptions })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
