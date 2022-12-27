<template>
  <div class="flex justify-center  w-full">
    <div :class="mainDiv(drawers)"
         class=" bg-gray-200   w-[0rem]
                        pt-16
                        mx-auto">

      <div v-for="([key,value],s) of Object.entries(mainData?.data)" :key="s" class=" w-full ">
        <div>
          <v-row>
            <div :class="WeekCardEdite(drawers)">
              <div class="flex items-center justify-center">
                <div class="uppercase w-40 text-2xl">{{ navKey }}</div>
                <div
                    class="flex justify-center my-3 w-full items-center ">
                  <span class="text-xl w-20 text-center lg:ml-80 md:ml-72 2xl:ml-80">потенциальная мощность</span>
                  <span class="text-3xl w-16 pl-20">{{
                      mainData?.count > 1 ? (Math.round(mainData?.count)) : (Math.ceil(mainData?.count) < 1) ? (1) : Math.ceil(mainData?.count)
                    }}</span>
                  <div class="w-fit  flex justify-end">
                    <div class=" bg-blue-500 ml-5">
                      <input v-model="changeCalendar"
                             class="text-white- rounded" type="date" @mouseleave="changeData"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-space-between  px-2 md:pr-3" @mouseenter="scrollHeadStart"
                   @mouseleave="scrollHeadFinish">
                <v-card v-for="(card,d) in calendar?.days?.ru" :key="d"
                        class="bg-amber-500
                               font-extrabold
                               text-center
                               text-[12px]
                               py-1
                               w-[12%]
                               h-full">
                  {{ card }}
                </v-card>
              </div>
            </div>
            <div class="fixed z-10 top-0 mt-[95vh] h-10 w-full" @mouseenter="scrollFooterStart"
                 @mouseleave="scrollFooterFinish"></div>
          </v-row>

          <div class="text-3xl text-center mb-4 uppercase   mt-13 pl-8">
            {{ key }}
          </div>
          <v-row id=" main-card" :class="key" class="flex  justify-start mx-auto sm:pl-3 lg:pl-2"
                 @mousemove="funk(key)">

            <div :class="startMonthWeek(drawers,mainData,key,calendar)"
                 class="ml-2"
            ></div>
            <v-card v-for="(days, i) in value " :key="i"
                    :class="dragMainCard(drawers)">
              <Container
                  v-for="(dayKey,j) in days"
                  :key="j"
                  :drop-placeholder="{className:'placeholder'}"
                  :get-child-payload="getChildPayload"
                  class="w-full h-full"
                  group-name="trello"
                  @drop="handleDrop(`${Object.keys(days)[0]}`, $event, `${key}`, i)"
                  @drag-start="handleDragStart(`${Object.keys(days)[0]}`, $event,`${key}`, i,)"
              >{{ 1 + i }}
                <Draggable
                    v-for="(project,index) in dayKey?dayKey:0" :key="index"
                >
                  <dropcard
                      :class="index+1 <= ( mainData?.count > 1 ? Math.round(mainData?.count) : Math.ceil(mainData?.count)<1?1:Math.ceil(mainData?.count))?'shadow-gray-600/70': 'shadow-red-600/50 text-red-500' "
                      class="text-[12px]
                    font-extrabold
                    rounded-3xl
                    shadow-lg
                    flex
                    justify-center
                    drop-shadow-xl
                    bg-blue-400 "
                  >
                    <div class="h-fit w-[100%]  text-xl">
                      {{ project?.order?.name }}
                    </div>
                    <div class="h-fit w-fit flex justify-center">
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
                          <edite-modal :modalData="project?.order" @closeModal="funks(dialog3)"/>
                        </template>
                      </v-dialog>
                      <!--        Edite Modal end      -->
                    </div>
                  </dropcard>
                </Draggable>
              </Container>
            </v-card>
          </v-row>
        </div>
        <drag-and-drop-modal
            :date="deliveryDates"
            :modalinfo="modalData"
            :product-create="openDrag"
            @closemodal="openDrag=!openDrag"></drag-and-drop-modal>
      </div>
      {{ infinite ? '' : '' }}
    </div>
  </div>

</template>

<script>
import Dropcard from "@/components/DropCard";
import {Container, Draggable} from 'vue-smooth-dnd'
import DragAndDropModal from "@/views/Calendar/DragAndDropModal";
import {dragMainCard, mainDiv, startMonthWeek, WeekCardEdite} from "@/utils/CalendarPageData/dragStyle";
import {calendarDate} from "@/utils/CalendarPageData/calendarData";
import {calendarMethods} from "@/utils/CalendarPageData/calendarMethods";
import EditeModal from "@/views/Home/EditeModal";


export default {
  name: "DragDrop",
  props: {
    drawers: { required: true }
  },
  components: {DragAndDropModal, Container, Draggable, Dropcard,EditeModal},
  data: () => ({
    WeekCardEdite,
    dragMainCard,
    mainDiv,
    startMonthWeek,
    edite: 0,
    today:''
  }),
  mixins: [calendarDate, calendarMethods],
  computed: {
    // eslint-disable-next-line
    infinite() {
      let values = []
      let objectKeys = []
      for (const [key, value] of Object.entries(this.mainData?.data)) {
        values.push(value)
        objectKeys.push(key)
      }
      return objectKeys
    },
  },

  async mounted() {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      this.today = yyyy + '-' + mm + '-' + dd;
      console.log( this.today, 'today')
      await this.$store.dispatch('setDragAndDrop', (await this.$axios.get(`orderCalendar/${ this.today}`))?.data)
      this.mainData = await this.$store.getters['getDragAndDrop']

      if (await this.mainData?.data) {
        let currentScroll = document.documentElement.scrollTop
        currentScroll = currentScroll + 1200
        document.documentElement.scrollTop = currentScroll
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>