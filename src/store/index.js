import Vue from 'vue'
import Vuex from 'vuex'
import HomeViewDate from "@/store/HomeView/HomeViewDate";
import dragAndDrop from "@/store/CalendarPage/DragAndDrop";
import deliveryData from "@/store/UserPage/deliveryData";
import userData from "@/store/UserPage/userData";
import socket from "@/store/socket";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  actions:{
    SOCKET_newMassage(ctx,data){
      console.log("success")
      console.log("Massage",data)
    }
  },
  modules: {
    HomeViewDate,
    dragAndDrop,
    deliveryData,
    userData,
    socket
  }
})
