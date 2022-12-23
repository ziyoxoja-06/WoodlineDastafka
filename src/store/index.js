import Vue from 'vue'
import Vuex from 'vuex'
import HomeViewDate from "@/store/HomeView/HomeViewDate";
import dragAndDrop from "@/store/CalendarPage/DragAndDrop";
import deliveryData from "@/store/UserPage/deliveryData";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules: {
    HomeViewDate,
    dragAndDrop,
    deliveryData
  }
})
