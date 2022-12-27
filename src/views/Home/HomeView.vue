<template>
  <v-container fluid>
    <div class="pa-2 min-h-[85vh] bg-[#50d1ff]">
      <v-card class="my-3  mx-[4.2%]">

        <div class="flex items-center   bg-[#ffc744]">
          <span class="text-xl ml-2">Банк</span>
          <v-spacer/>
          <!--         Create Modal start    -->
          <v-dialog
              max-width="700"
              transition="dialog-top-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <template v-slot:default="dialog1">
              <product-create-modal @closeModal="funk(dialog1)"/>
            </template>
          </v-dialog>
          <!--        Create Modal end      -->

        </div>
      </v-card>
      <div class="flex justify-center">
        <v-card v-for="(day,i) in days" :key="i" class="card h-fit w-[30%] mx-1 ">
          <v-card-title>
            {{ day.text }}
          </v-card-title>
          <Container
              :get-child-payload="getChildPayload"
              class="w-full h-full"
              drag-class="bg-gray-500 "
              drop-class="bg-yellow-500"
              group-name="trello"
              @drop="handleDrop(i,$event,day.value)"
              @drag-start="handleDragStart(i,$event)"

          >
            <draggable v-for="(item,j) in day.data" :key="j">
              <drop-card class="bg-pink-500">
                <span class="ml-3">{{ item.name }}</span>
                <v-spacer/>

                <!--         About Modal start    -->
                <v-dialog
                    max-width="600"
                    transition="dialog-top-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon color="white" small> mdi-clipboard-text</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog2">
                    <about-modal :modalData="item" @closeModal="funk(dialog2)"/>
                  </template>
                </v-dialog>
                <!--        About Modal end      -->
                <!--         Edite Modal start    -->
                <v-dialog
                    max-width="800"
                    transition="dialog-top-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon color="white" small>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog3">
                    <edite-modal :modalData="item" @closeModal="funk(dialog3)"/>
                  </template>
                </v-dialog>
                <!--        Edite Modal end      -->
              </drop-card>
            </draggable>
          </Container>
        </v-card>
      </div>
    </div>
  </v-container>

</template>

<script>
import DropCard from "@/components/DropCard";
import {Container, Draggable} from 'vue-smooth-dnd'
import ProductCreateModal from "@/views/Home/ProductCreateModal";
import AboutModal from "@/views/Home/AboutModal";
import EditeModal from "@/views/Home/EditeModal";

export default {
  // eslint-disable-next-line
  name: 'Home',
  data: () => ({
    draggingCard: [],
    todayDay: '',
    dragingCard: {
      lane: '',
      index: -1,
      cardData: {},
    },
    connection:'null',
    days: [{text: 'Сегодня', value: '', data: []},
      {text: 'Завтра', value: '', data: []},
      {text: 'Cледующий день', value: '', data: []}]
  }),
  components: {Container, Draggable, DropCard, ProductCreateModal, AboutModal ,EditeModal},
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
    }
  },
  methods: {
    funk(item) {
      item.value = false
      this.callData()
    },
    async handleDragStart(lane, dragResult) {
      const {payload, isSource} = dragResult
      if (isSource) {
        this.draggingCard = {
          lane,
          index: payload.index,
          cardData: {
            ...this.days[lane].data[payload.index]
          }
        }
      }
    },
    async handleDrop(lane, dropResult, data) {
      const {removedIndex, addedIndex} = dropResult
      if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
        return;
      }
      if (removedIndex !== null) {
        this.days[lane].data.splice(removedIndex, 1)
      }
      if (addedIndex !== null) {
        this.days[lane].data.splice(addedIndex, 0, this.draggingCard.cardData)
        this.$axios.put(`order/${this.draggingCard.cardData.id}`, {
          when_to: data,
          title: this.draggingCard.cardData.title
        })
      }
     await this.callData()
    },
    getChildPayload(index) {
      return {
        index,
      };
    },
    async dataPromise(data) {
      return await this.$axios.get(data)
    },
    async callData() {
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
      // console.log(this.connection)
      // this.connection= await new WebSocket("http://localhost:7000")
      // this.connection.onopen=function (event) {
      //   console.log(event)
      //   console.log("success")
      // }
      // console.log(this.connection)
    }
  },
  mounted() {
    this.callData()
  },
}
</script>