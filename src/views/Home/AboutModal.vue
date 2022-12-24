<template>
  <v-card>
    <v-card-title class="text-h5  lighten-2">
      Заявка: {{modalData.name}}
    </v-card-title>

    <v-card-text>
      <div class="pt-3 flex items-center">
        <v-label ><v-icon color="warning" class="mb-7">mdi-map-marker</v-icon></v-label>
        <v-text-field class="w-36 font-weight-bold" disabled dense outlined :label="modalData.where_to"/>
        <v-label ><v-icon color="warning" class="mb-7 ml-3">mdi-truck-fast</v-icon></v-label>
        <v-text-field class="w-36 font-weight-bold pl-2" :label="modalData.from_where" disabled outlined dense />

      </div>
      <span class="font-extrabold  text-xl">Дата отправки: {{(modalData.when_to.toString().slice(0,10))}}</span>
      <div class="pt-3 flex items-center" :hidden="modalData.is_completed" >
        <span class="font-extrabold text-xl" >Готовый: </span>
        <button
            :hidden="modalData.is_completed===true"
          class="w-[20px]">
        <div class="orbit-spinner">
          <div class="orbit"></div>
          <div class="orbit"></div>
          <div class="orbit"></div>
        </div>
      </button>
        <div class="w-[30px] h-fit mt-1 ml-2"  :hidden="modalData.is_completed===false">
          <button
              class="w-full h-5 sm:h-6 md:h-7 lg:h-7 bg-green-500 flex justify-center items-center rounded-3xl">
            <v-icon color="white">mdi-check</v-icon>
          </button>
        </div>
      </div>
      <span class="font-extrabold text-xl" >Заголовок: {{modalData.title}}</span>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="closeModal"
      >
        Закрывать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AboutModal",
  props:{
    modalData:{
      namespaced:true
    }
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
@import "Table.css";
</style>