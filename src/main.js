import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store"

import Vuex from 'vuex'
import drizzleVuePlugin from "@drizzle/vue-plugin"
import drizzleOptions from "./drizzleOptions"
import vuetify from './plugins/vuetify'

import VuePageTransition from 'vue-page-transition'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import vueCountryRegionSelect from 'vue-country-region-select'

Vue.use(vueCountryRegionSelect)

Vue.use(VueRouter)

Vue.use(VuePageTransition)

Vue.use(Vuetify)

Vue.use(Vuex)

Vue.use(drizzleVuePlugin, {store, drizzleOptions })

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
