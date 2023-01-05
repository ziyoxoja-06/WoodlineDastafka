<template>
  <v-container>
    <v-card>

      <v-toolbar
          color="primary"
          dark
      >Завершить доставка
      </v-toolbar>
      <v-card-title>

      </v-card-title>
      <v-card-text class="px-5 pt-5">
        <div  class="w-full z-50 flex  justify-center absolute">
          <v-alert class="text-center top-0 fixed" width="100%" v-if="alert.alertActive" :type="alert.alertType">{{alert.alertText}}</v-alert>
        </div>

          <v-card class=" mb-5"  v-for="(el,i) in socketModal" :key="i">

            <v-card-title>
              <h1 class="w-full">{{el?.name}}</h1>
              <h1 class="w-full">Остаток: {{el?.balance}}</h1>
              <h1>Заголовок: {{el?.title}}</h1>

            </v-card-title>
            <v-card-text>
              <v-form
                  :ref="('form'+i)"
                  v-model="valid"
                  lazy-validation>
              <div class="flex">
                <v-text-field  class="w-[50%]" prepend-icon="mdi-clipboard-text-clock" dense outlined :label="el.when_to | momentFilter" disabled/>
                <v-icon color="red " class="mb-8">mdi-swap-horizontal</v-icon>
                <v-text-field :min="toDay" :rules="whenRules" class="w-[50%]" dense outlined label="Новая дата отправки"   v-model="formEl[`when_to${i}`]"  type="datetime-local"/>
              </div>
              <v-text-field :rules="titleRules" prepend-icon="mdi-clipboard-text" dense outlined label="Заголовок"  v-model="formEl[`title${i}`]"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="error" @click="cleareBtn(i)">Очистить </v-btn>
              <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="warning"
                  @click="submitFunk(i,el)"
              >Отправить
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import * as moment from "moment/moment";
import "moment/locale/ru"
moment.locale('ru')
export default {
  name: "WebSocketModal",
  // eslint-disable-next-line vue/no-unused-components
  components:{moment},
  props:{
    socketModal:{
      namespaced:true
    }
  },
  data:()=>({
    formEl:[],
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
    days: [{text: 'Сегодня', value: '', data: []},
      {text: 'Завтра', value: '', data: []},
      {text: 'Cледующий день', value: '', data: []}],
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
    async dataPromise(data) {
      return await this.$axios.get(data)
    },
    async callData() {
      this.days= [{text: 'Сегодня', value: '', data: []},
        {text: 'Завтра', value: '', data: []},
        {text: 'Cледующий день', value: '', data: []}]
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
        })
        this.$store.dispatch('setHomeDrag',this.days)
      })

    },
    cleareBtn(i){
     this.loader = 'loading'
     const l = this.loader
     this[l] = !this[l]
     setTimeout(()=>{
       this.$refs[('form'+i)][0].reset()
       this[l] = false
     },2000)
     this.loader = null
    },
    async submitFunk(i,el){
      console.log(el)
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs[('form'+i)][0].validate()) {
        // console.log(+this.formEl[`when_to${i}`].slice(0,4),this.formEl[`when_to${i}`].slice(5,7)-1,+this.formEl[`when_to${i}`].slice(8,10),+this.formEl[`when_to${i}`].slice(11,13),+this.formEl[`when_to${i}`].slice(14,16),'lll')
        const when_to=new Date(+this.formEl[`when_to${i}`].slice(0,4),this.formEl[`when_to${i}`].slice(5,7)-1,+this.formEl[`when_to${i}`].slice(8,10),+this.formEl[`when_to${i}`].slice(11,13),+this.formEl[`when_to${i}`].slice(14,16)).getTime(),
            title=this.formEl[`title${i}`]
        try {
          setTimeout(()=>{
            if (this.socketModal?.length===1){
              this.$emit('closeModal')
              this.$axios.put(`order/${this.socketModal[i]?.id}`,{when_to,title})
              this.callData()
            }else {
               this.$axios.put(`order/${this.socketModal[i]?.id}`,{when_to,title})
              this.callData()
            }
            this.callData()
            this.$emit("removeItem",i)
            this.alert=false
            this[l] = false
          },2000)
          this.loader = null
          this.$refs[('form'+i)][0].reset()
        }catch (e) {
          console.log(e)
        }
      }else {
        this.formEl[`when_to${i}`]=''
        this.formEl[`title${i}`]=''
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