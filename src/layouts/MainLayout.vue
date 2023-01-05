<template>
  <v-app >
    <v-app-bar
        app
        color="primary"
        dark
        clipped-left
    >
      <v-btn  icon @click="drawer=!drawer">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-app-bar-title>
        {{ date | date('datetime')}}
      </v-app-bar-title>
      <v-spacer/>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              width="30px"
              height="30px"
              class="ma-2"
              outlined
              color="shades"
              v-bind="attrs"
              v-on="on"
          >
            Log Out
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in itemsDrop"
              :key="index"
          >
            <v-list-item @click.prevent="logout">{{ item.title }}</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
        clipped
        v-model="drawer"
        app
        dark
        class="z-30"
    >
      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
            @click="drawer=false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view :drawers="drawer" />
      <v-dialog
          v-model="sheet"
          persistent
          max-width="1000"
      >
        <web-socket-modal @removeItem="removeItem" @closeModal="closeModal" :socketModal="socketMessage" />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import {itemsDrop,items} from './MainLayouData'
import WebSocketModal from "@/components/WebSocketModal";
// import HomeView from "@/views/Home/HomeView";
export default {
  name: "MainLayout",
  data:()=>({
    socketMessage:[],
    sheet:false,
    itemsDrop,
    items,
    drawer:false,
    date:null,
    interval:null,
    navarName:'',
    socketConecting:true,
  }),
  sockets: {
    connect: function () {
      console.log('socket Vuex connected')
    },
    customEmit: function (data) {

      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
    },
    newMessage(data) {
      if (this.sheet===false){
        console.log(data,'Socket Data')
        this.socketMessage = data
      }

    }

  },
  components:{WebSocketModal},
  methods:{
    async dataPromise(data) {
      return await this.$axios.get(data)
    },
   async removeItem(index){
     if (this.socketMessage.length!==1){
       this.socketMessage.splice(index,1)
       await this.getData()
     }
     this.days= await this.$store.getters['getHomeDrag']
     let year = (new Date().getFullYear()),
         month = new Date().getMonth(),
         day = new Date().getDate()

     await this.days.forEach((el, i) => {
       let date = new Date(year, month, day + i).getTime()
       let responseDatas = this.dataPromise(`order/${date}`)
       responseDatas.then((responData) => {
         if (responData.status === 200) {
           el.value = date
           el.data = responData.data
         }
         this.$store.dispatch('setHomeDrag',this.days)
       })
     })
    },
    closeModal(){
      this.sheet=false
    },
    logout(){
      this.$router.push('/sign-in?message=logout')
    },
    getData(){
      for (let i = 0; i < this.socketMessage.length; i++) {
        this.formEl.push(
            {
              [`when_to${i}`]:'',
              [`title${i}`]:'',
              [`balance${i}`]:'',
              [`check${i}`]:false,
            }
        )
      }
      this.interval= setInterval(()=>{
        this.date = new Date()
      },1000)
    }
  },
  mounted() {
    this.getData()
  },
  watch:{
    socketMessage(){
      this.sheet=true
    }
  },
  beforeDestroy() {
    clearTimeout(this.interval)
  }
}
</script>

<style scoped>

</style>