<template>
  <v-card >
    <v-card-title >
      <v-text-field
          v-model="searchData"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-data-table
          v-model="selected"
          :headers="header"
          :items="$store.getters['getUserData']"
          :search="searchData"
          :single-select="items?.deliveries?.length!==0"
          show-select
          @item-selected="sendData"

          class="elevation-1"
      >
<!--         eslint-disable-next-line-->
        <template v-slot:item.when_to="{ item }">
        {{ formatDate(item.STRT_D) }}
      </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "DeliveryTable",
  props:{
    header:{namespaced:true},
    tableDate:{namespaced:true},
    items:{namespaced:true},
  },
  data:()=>({
    searchData:'',
    singleSelect: false,
    selected: [],
  }),
  methods:{
    sendData(){
      this.$emit('selected',this.selected)
    },
    formatDate(value) {
      // eslint-disable-next-line
      return  moment(value).format('DD[.]MM[.]YYYY')
    }
  },
  watch:{
    selected(){
      this.$store.dispatch('setDeliveryData',this.selected)
    },
    tableDate(){
      this.selected=[]
      this.$store.dispatch('setDeliveryData',this.selected)
    }
  }
}
</script>

<style scoped>

</style>