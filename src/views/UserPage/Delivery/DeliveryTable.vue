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
          :items="tableDate"
          :search="searchData"
          item-key="name"
          single-expand
          show-select
          @item-selected="sendData"

          class="elevation-1"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DeliveryTable",
  props:{
    header:{namespaced:true},
    tableDate:{namespaced:true},
  },
  data:()=>({
    searchData:'',
    singleSelect: false,
    selected: [],
  }),
  methods:{
    sendData(){
      this.$emit('selected',this.selected)
    }
  },
  watch:{
    selected(){
      this.$store.dispatch('setDeliveryData',this.selected)
    }
  }
}
</script>

<style scoped>

</style>