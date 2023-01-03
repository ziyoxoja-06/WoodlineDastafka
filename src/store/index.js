import Vue from 'vue'
import Vuex from 'vuex'
import HomeViewDate from "@/store/HomeView/HomeViewDate";
import dragAndDrop from "@/store/CalendarPage/DragAndDrop";
import deliveryData from "@/store/UserPage/deliveryData";
import userData from "@/store/UserPage/userData";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },
  mutations:{
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_MESSAGECHANNEL(state, message) {
      console.log(message,'mm')
      state.socketMessage = message
    }
  },
  actions: {
    Socket_newMassage(ctx,text){
      console.log("massage", text)
    }
  },
  modules: {
    HomeViewDate,
    dragAndDrop,
    deliveryData,
    userData,
  }
})
