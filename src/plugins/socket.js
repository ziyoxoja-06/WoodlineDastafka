import Vue from 'vue';
import VueSocketIO from "vue-socket.io";
import store from "@/store";

export default function (){
    Vue.use(new VueSocketIO({
            debug: true,
            connection: 'http://localhost:7000', //options object is Optional
            vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_',
          }
        })
    );
}