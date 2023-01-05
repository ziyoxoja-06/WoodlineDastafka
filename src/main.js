import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import router from './router'
import dateFilter from "@/filters/date.filter";
import tailwind from './assets/tailwind.css'
import vuetify from './plugins/vuetify'
import store from './store'
import print from "vue-print-nb/print";
import VueSocketIO from 'vue-socket.io'
import SocketIo from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection:  SocketIo('http://localhost:7000/'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  }
}));

Vue.config.productionTip = false
Vue.filter('date',dateFilter)
new Vue({
  router,
  tailwind,
  vuetify,
  store,
  print,
  render: h => h(App)
}).$mount('#app')
