<template>
  <v-card>
    <v-toolbar
        color="primary"
        dark
    >
      Редактирование заявки
    </v-toolbar>
    <v-card-text class="px-16 pt-5">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <div class="flex">
        <v-text-field  class="w-[50%]" prepend-icon="mdi-clipboard-text-clock" dense outlined :label="modalData?.when_to | momentFilter " disabled/>
          <v-icon color="red " class="mb-8">mdi-swap-horizontal</v-icon>
        <v-text-field  :rules="whenRules" class="w-[50%]" dense outlined label="Новая дата отправки"  v-model="when_to"  type="datetime-local" :min="toDay"/>
          </div>

        <v-text-field :rules="titleRules" prepend-icon="mdi-clipboard-text" dense outlined label="Заголовок" v-model="title"/>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
          color="red darken-4"
          @click="close()"
      ><span class="white--text">Перезагрузить</span>
      </v-btn>
      <v-btn
          :loading="loading"
          :disabled="loading||!valid"
          color="warning"
          @click="submitFunk"
      >Отправить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as moment from "moment/moment";
import "moment/locale/ru"
moment.locale('ru')
export default {
  name: "EditeModal",
  props:{
    modalData:{
      namespaced:true
    }
  },
  data:()=>({
    loader: null,
    loading: false,
    valid: true,
    whenRules: [
      v => !!v || 'Требуется when',
    ],
    titleRules: [
      v => !!v || 'Требуется title',
    ],
    openmodal:true,
    calendar:null,
    when_to:'',
    title: '',
    alert:false,
  }),
  filters: {
    momentFilter: function (date) {
      return moment(date).format('LLL');
    }
  },
computed:{
  // eslint-disable-next-line vue/return-in-computed-property
  toDay: function () {
    var today = new Date(),
     dd = String(today.getDate()).padStart(2, '0'),
     mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
     yyyy = today.getFullYear(),
     hour= today.getHours(),
     minut=today.getMinutes()


    return yyyy + '-' + mm + '-' + dd +'T'+hour+':'+minut;
  }
},
  methods:{
    async submitFunk(){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs.form.validate()) {
        const when_to=new Date(+this.when_to.slice(0,4),this.when_to.slice(5,7)-1,+this.when_to.slice(8,10),+this.when_to.slice(11,13),+this.when_to.slice(14,16)).getTime(),
            title=this.title
        console.log(when_to)
        try {
          await this.$axios.put(`order/${this.modalData.id}`,{when_to,title})
          setTimeout(()=>{
            this.$emit('closeModal')
            this.alert=false
            this[l] = false
          },2000)
          this.loader = null
          this.$refs.form.reset()
        }catch (e) {
          console.log(e)
        }
      }else {
         this.when_to=''; this.title=''
      }
    },
    close(){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      this.alert=false
      this.loader = null
      this.$refs.form.reset()
    }
  },
}
</script>

<style scoped>

</style>