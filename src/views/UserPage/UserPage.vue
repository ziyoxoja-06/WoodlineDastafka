<template>
  <v-container fluid>
    <div class="pa-2 min-h-[85vh] bg-[#50d1ff]">
      <v-card class="my-3  mx-[4.2%]">


        <div class="flex items-center   bg-[#ffc744]">
          <span class="text-xl ml-2">Доставка</span>
          <v-spacer/>
          <!--         Create User Modal start    -->
          <create-user-modal @closeModal="close()"/>
          <!--        Create User Modal end      -->
        </div>
      </v-card>
      <v-row class="ml-[3%] mr-[3%]">
        <v-col v-for="(item,i) in $store.getters['getDragAndDrop']" :key="i" cols="4">
          <v-card class="min-h-[150px]">
            <v-card-title>
              {{ item.user_name }}
            </v-card-title>
            <v-card-text class="flex">
              <div class="w-[50%]">
                <div v-for="(el,j) in item.deliveries[0]?.orders" :key="j">

                  <v-chip class="inline shadow-lg shadow-gray-600/10 ">
                    {{ el?.order?.name }}
                  </v-chip>
                </div>
              </div>
              <div class="w-[50%]">
                <div :class="item.deliveries.length===0?'hidden':''" class="flex items-center">
                  <v-icon color="error">mdi-map-marker</v-icon>
                  {{ item.deliveries[0]?.from }}
                  <v-icon class="mx-2" color="warning">mdi-truck-fast</v-icon>
                  {{ item.deliveries[0]?.to }}
                </div>

              </div>

            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <!--         Delivery Create Modal start    -->
              <div :hidden="item?.deliveries?.length!==0">
                <delivery-give-to-user :items="item" @closeModal="close()"/>
              </div>
              <!--        Delivery Create Modal end      -->

              <!--         Create User Modal start    -->
              <div v-if="item?.deliveries?.length!==0">
                <finish-deliveries :finishItem="item" @closeModal="close(dialog3)"/>
              </div>
              <!--        Create User Modal end      -->

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<script>
import CreateUserModal from "@/views/UserPage/CreateUserModal";
import DeliveryGiveToUser from "@/views/UserPage/Delivery/DeliveryGiveToUser";
import FinishDeliveries from "@/views/UserPage/Delivery/FinishDeliveries";

export default {
  name: "UserPage",
  data: () => ({
    dialog1: false,
    dialog2: false,
    dialog3: false,
    mainData: []
  }),
  components: {FinishDeliveries, DeliveryGiveToUser, CreateUserModal},
  methods: {
    async close() {
      await this.$store.dispatch('setDragAndDrop', (await this.$axios.get(`user_delivery`))?.data)
      this.mainData = await this.$store.getters['getDragAndDrop']
    },
    async firstBuildData() {

      await this.$store.dispatch('setDragAndDrop', (await this.$axios.get(`user_delivery`))?.data)
      this.mainData = await this.$store.getters['getDragAndDrop']
    }
  },
  mounted() {
    this.firstBuildData()
  }
}
</script>