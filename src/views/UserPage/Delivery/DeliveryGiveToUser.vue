<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="info"
          v-bind="attrs"
          v-on="on"
      >
        Доставка
      </v-btn>
    </template>
    <template >
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="dialog=false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

          </v-toolbar-items>
        </v-toolbar>
        <div class="w-full flex bg-green-200">
          <div class="w-[50%] h-full">
            <delivery-table @selected="selected" :header="headers" :tableDate="tableDate" />
          </div>
          <div class="w-[50%] h-[100%] flex align-center">
            <div class="w-full h-[90vh]">
              <delivery-create-modal @closeModal="close" :items="items" :selectDatas="selectData"/>
            </div>
          </div>
        </div>

      </v-card>
    </template>
  </v-dialog>

</template>

<script>
import DeliveryTable from "@/views/UserPage/Delivery/DeliveryTable";
import DeliveryCreateModal from "@/views/UserPage/DeliveryCreateModal";
export default {
  name: "DeliveryGiveToUser",
  components: {DeliveryTable,DeliveryCreateModal},
  props:{
    items:{namespaced:true}
  },
  data:()=>({
    dialog:false,
    selectData:'',
    headers: [
      {
        text: 'Наименование модели',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Где', value: 'from_where' },
      { text: 'Куда', value: 'where_to' },
      { text: 'Когда', value: 'when_to' },
      { text: 'Деньги', value: 'balance' },
    ],
    tableDate:[]
  }),
  methods:{
    close(){
      this.selectData=[]
      this.dialog=false
      this.$emit('closeModal')
    },
    selected(value){

      this.selectData=value
    },
    async callDatallData() {
      let response = (await this.$axios.get('orders_to_deliver')).data
     await this.$store.dispatch('setUserData',response)

  },},
  mounted() {
     this.callDatallData()
  }
}
</script>