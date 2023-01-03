<template>
  <v-card>
    <v-toolbar
        color="primary"
        dark
    >Создание продукта
    </v-toolbar>
    <v-card-text class="px-16 pt-5">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
        <v-text-field :rules="nameRules" prepend-icon="mdi-sofa" dense outlined label="Наименование модели" v-model="name" />
        <v-text-field :rules="fromRules" prepend-icon="mdi-map-marker" dense outlined label="Откуда (забрать)" v-model="from"/>
        <v-text-field :rules="whereRules" prepend-icon="mdi-truck-fast" dense outlined label="Куда (отправить)" v-model="where_to"/>
        <v-text-field :min="toDay" :rules="whenRules" prepend-icon="mdi-clipboard-text-clock" dense outlined label="Дата отправки"  v-model="when_to"  type="datetime-local"/>
        <v-textarea :rules="titleRules" prepend-icon="mdi-clipboard-text" dense outlined label="Заголовок" v-model="title"/>
        <v-text-field :rules="balanceRules" prepend-icon="mdi-currency-usd" type="number" dense outlined label="Остаток" v-model="balance"/>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end text-white">
      <v-btn
          color="red darken-4"
          @click="resets"
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
export default {
  name: "ProductCreateModal",
  data:()=>({
    loader: null,
    loading: false,
    valid: true,
    nameRules: [
      v => !!v || 'Требуется имя',
    ],
    fromRules: [
      v => !!v || 'Требуется mесто',
    ],
    whereRules: [
      v => !!v || 'Требуется oтправить mесто',
    ],
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
    openmodal:true,
    calendar:null,
    name:'',
    from:'',
    where_to:'',
    when_to:'',
    title: '',
    balance:'',
    alert:false,
  }),
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
    resets() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
        this.alert=false
        this[l] = false
      this.loader = null
      this.$refs.form.reset()
    },
  async submitFunk(){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      if (this.$refs.form.validate()) {
        const name = this.name,
            from=this.from,
            where_to=this.where_to,
            when_to=new Date(+this.when_to.slice(0,4),this.when_to.slice(5,7)-1,+this.when_to.slice(8,10),+this.when_to.slice(11,13),+this.when_to.slice(14,16)).getTime(),
            title=this.title,
            balance=this.balance
        console.log({name,from,where_to,when_to,title,balance},'jkdsjd')
        console.log(when_to)
        try {

          await this.$axios.post('order',{name,from,where_to,when_to,title,balance})
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
        setTimeout(()=>{
          this[l] = false
        },2000)
        this.loader = null
      }
    }
},
}
</script>

<style scoped>

</style>