import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import router from './router'
import dateFilter from "@/filters/date.filter";
import tailwind from './assets/tailwind.css'
import vuetify from './plugins/vuetify'
import store from './store'
import print from "vue-print-nb/print";
import moment from "moment/moment";

Vue.config.productionTip = false
Vue.filter('date',dateFilter)
new Vue({
  router,
  tailwind,
  vuetify,
  store,
  print,
  moment,
  render: h => h(App)
}).$mount('#app')
