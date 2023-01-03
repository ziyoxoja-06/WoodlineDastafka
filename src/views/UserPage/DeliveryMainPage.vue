<template>
  <v-container fluid>
    <div class="pa-2 min-h-[85vh] bg-[#50d1ff]">
      <v-card class="my-3  mx-[4.2%]">


        <div class="flex items-center   bg-[#ffc744]">
          <span class="text-xl ml-2">Доставка</span>
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
          <!--         Create User Modal start    -->
          <create-user-modal @closeModal="close()"/>
          <!--        Create User Modal end      -->
        </div>
      </v-card>
      <v-row class="ml-[3%] mr-[3%]">
        <v-col v-for="(item,i) in $store.getters['getDragAndDrop']" :key="i" cols="4">
          <v-card class="min-h-[160px]">
            <v-card-title>
              {{ item.user_name }}
            </v-card-title>
            <v-card-text class="">
              <div class="flex">
                <div class="w-[50%]">
                  <div v-for="(el,j) in item.deliveries[0]?.orders" :key="j">

                    <v-chip class="inline shadow-lg shadow-gray-600/10 ">
                      {{ el?.order?.name }}
                    </v-chip>
                  </div>
                </div>
                <div class="w-[50%] flex items-center" :class="(item?.deliveries?.length===0)?'hidden':''">
                    <v-icon color="error">mdi-map-marker</v-icon>
                    {{ item.deliveries[0]?.from }}
                    <v-icon class="mx-2" color="warning">mdi-truck-fast</v-icon>
                    {{ item.deliveries[0]?.to }}
                </div>
              </div>

              <div class="w-full flex mt-5" :class="item.deliveries.length===0?'hidden':''">
                  <span class="mr-1">Заголовок: </span>{{item.deliveries[0]?.comment}}
              </div>

            </v-card-text>
            <v-card-actions class=" md:inline xl:flex 2xl:flex align-center ">
              <v-spacer/>
              <!--         Delivery Create Modal start    -->
              <div class="ma-2" >
                <delivery-give-to-user  :items="item" @closeModal="close()"/>
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
import ProductCreateModal from "@/views/Home/ProductCreateModal";

export default {
  name: "DeliveryMainPage",
  data: () => ({
    dialog1: false,
    dialog2: false,
    dialog3: false,
    mainData: []
  }),
  components: {ProductCreateModal, FinishDeliveries, DeliveryGiveToUser, CreateUserModal},
  methods: {
    funk(item) {
      item.value = false
      this.callData()
    },
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