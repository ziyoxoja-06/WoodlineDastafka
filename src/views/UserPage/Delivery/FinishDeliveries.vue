<template>
  <v-dialog
      v-model="dialog"
      max-width="800"
      transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
         color="warning"
          v-bind="attrs"
          v-on="on"
      >
        Заверщить доставка
      </v-btn>
    </template>
    <template >
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

          <v-card class=" mb-5"  v-for="(el,i) in finishItem?.deliveries[0]?.orders" :key="i">
            <v-card-title>
              <h1 class="w-full">{{el.order.name}}</h1>
              <h1>Balance: {{el.order.balance}}</h1>
            </v-card-title>
            <v-card-text>
              <v-form
                  :ref="('form'+i)"
                  v-model="valid"
                  lazy-validation>
                <v-text-field  class="form" type="number" :rules="balanceRules" prepend-icon="mdi-currency-usd" dense outlined label="Возьми деньги" v-model="formEl[`balance${i}`]"/>
                <v-textarea  class="form" :rules="titleRules" prepend-icon="mdi-clipboard-text" dense outlined label="Заголовок" v-model="formEl[`title${i}`]"/>
                <v-text-field  class="form" :rules="whenRules" prepend-icon="mdi-clipboard-text-clock" dense outlined label="Дата отправки"  v-model="formEl[`when_to${i}`]"  type="datetime-local"/>
                <v-checkbox
                    :disabled="((+el.order.balance===0)?false:+el.order.balance!==(+formEl[`balance${i}`]))"
                    v-model="formEl[`check${i}`]" class="ml-9" label="Завершить проект"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="error" @click="cleareBtn(i)">Очистить</v-btn>
              <v-btn
                  :loading="loading"
                  :disabled="loading||!formEl[`value${i}`]"
                  color="warning"
                  @click="submitFunk(i,el)"
              >Отправить
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-card-text>
        <v-card-actions class=" justify-end text-white">
          <v-btn color="warning"
                 :loading="loading"
                 :disabled="this.finishItem.deliveries[0].orders.length!==0"
                 @click="complate(finishItem.deliveries[0])"
          >Прекращение</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>

<script>
export default {
  name: "FinishDeliveries",
  props:{
    finishItem:{namespaced:true}
  },
  data:()=>({
    dialog:false,
    valid: true,
    loader: null,
    loader1: null,
    loading: false,
    loading1: false,

    alert:{
      alertActive:false,
      alertType:'',
      alertText:''
    },
    whenRules: [
      v => !!v || 'Требуется дата',
    ],
    titleRules: [
      v => !!v || 'Требуется заголовок',
    ],
    balanceRules: [
      v => !!v || 'Требуется деньги',
      v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999999999) || 'The value must be an integer number'
    ],
    when_to:'',
    title: '',
    balance:'',
    formEl:[]
  }),
  mounted() {
    for (let i = 0; i < this.finishItem.deliveries[0].orders.length; i++) {
      this.formEl[`value${i}`]=true
      this.formEl.push(
          {
            [`when_to${i}`]:'',
            [`title${i}`]:'',
            [`balance${i}`]:'',
            [`check${i}`]:false,
          }
      )
    }
    },
  methods:{
   async complate(el){
     this.loader1 = 'loading'
     const l = this.loader1
     this[l] = !this[l]
     console.log(el,'el',el.id)
      await this.$axios.put(`delivery/${el.id}`)
     setTimeout(()=>{
       this.$emit('closeModal')
       this.alert.alertActive=false
       this[l] = false
     },2000)
     this.loader = null
    },
    cleareBtn(i){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      setTimeout(()=>{
        console.log(this.$refs,'log')
        this.$refs[('form'+i)][0].reset()
        this.alert.alertActive=false
        this[l] = false
      },2000)
      this.loader = null
    },
    async submitFunk(i,el){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs[('form'+i)][0].validate()) {
        const title=this.formEl[`title${i}`],
            payment=this.formEl[`balance${i}`],
            user=this.finishItem.user_id,
            when_to = new Date(+this.formEl[`when_to${i}`]?.slice(0,4),this.formEl[`when_to${i}`].slice(5,7)-1,+this.formEl[`when_to${i}`].slice(8,10),+this.formEl[`when_to${i}`].slice(11,13),+this.formEl[`when_to${i}`].slice(14,16)+1).getTime(),
            delivery_order=el.id
        let  complete=(await this.formEl[`check${i}`] !== undefined && await this.formEl[`check${i}`] !== null)
        try {
          console.log(payment,title,when_to,user,complete,delivery_order)
          await this.$axios.put(`order_deliver/${el.order.id}`,{payment,title,when_to,user,complete,delivery_order})
          this.alert.alertText="Он изменился"
          this.alert.alertType='success'
          this.alert.alertActive=true
          setTimeout(()=>{
            this.$emit('closeModal')
            this.$refs[('form'+i)][0].reset()
            this.alert.alertActive=false
            this[l] = false
          },2000)
          this.loader = null
        }catch (e) {
          console.log(e)
        }
      }else {
        this.alert.alertText="Что-то не так"
        this.alert.alertType='error'
        this.alert.alertActive=true
        setTimeout(()=>{
          this[l] = false
          this.alert.alertActive=false
        },2000)
        this.loader = null
        this.when_to=''; this.title=''; this.balance=''
      }
    }
  },
  watch:{

  },




}
</script>

<style scoped>

</style>