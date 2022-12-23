<template>
  <v-card>
    <v-card-title class="flex justify-center font-extrabold text-2xl">{{items.user_name}}</v-card-title>
    <v-card-text class="px-16 pt-5">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
        <v-text-field :rules="fromRules" prepend-icon="mdi-map-marker" dense outlined label="Место продукта" v-model="from"/>
        <v-text-field :rules="whereRules" prepend-icon="mdi-truck-fast" dense outlined label="Oтправить место" v-model="where_to"/>
        <v-text-field :rules="whenRules" prepend-icon="mdi-clipboard-text-clock" dense outlined label="Oтправки дата"  v-model="when_to"  type="datetime-local"/>
        <v-textarea :rules="titleRules" prepend-icon="mdi-clipboard-text" dense outlined label="Заголовок" v-model="title"/>
        <v-text-field :rules="balanceRules" prepend-icon="mdi-currency-usd" dense outlined label="Возьми деньги" v-model="balance"/>
      </v-form>
      <v-chip v-for="(item,index) in $store.getters['getDeliveryData']" :key="index" class="white--text m-2" :class="`${color[Math.floor(Math.random() * 3)]}`">{{item.name}}</v-chip>
    </v-card-text>
    <v-card-actions class="justify-end text-white">
      <v-btn
          color="red darken-4"
          @click="reset"
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
  name: "DeliveryCreateModal",
  props:{
    selectDatas:{
      namespaced:true
    },
    items:{
      namespaced:true
    }

  },
  data:()=>({
    loader: null,
    loading: false,
    valid: true,
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
    color:['red','green','pink','orange',]
  }),
  methods:{
    reset(){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      setTimeout(()=>{
        this.alert=false
        this[l] = false
      },100)
      this.loader=null
      this.$refs.form.reset()
    },
    async submitFunk(){
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      console.log(this.items.user_id)
      if (this.$refs.form.validate()) {
        const user = this.items.user_id,
            price=(+this.balance),
            when_to=new Date(+this.when_to.slice(0,4),this.when_to.slice(5,7)-1,+this.when_to.slice(8,10),+this.when_to.slice(11,13),+this.when_to.slice(14,16)).getTime(),
            from=this.from,
            to=this.where_to,
            comment=this.title,
            orderss=[]
        await this.$store.getters['getDeliveryData'].forEach(el=>{
          orderss.push(el.id)
        })
        console.log({user,price,when_to,from,to,comment,orderss})
        try {
          await this.$axios.post('delivery_with_orders',{user,price,when_to,from,to,comment,orderss})
          setTimeout(()=>{
            this.$emit('closeModal')
            this.alert=false
            this[l] = false
          },2000)
          this.$store.dispatch('setDeliveryData',[])
          this.loader = null
          this.$refs.form.reset()
        }catch (e) {
          console.log(e)
        }
      }else {
        this.from=''; this.where_to=''; this.when_to=''; this.title=''; this.balance=''
      }
    }
  },
}
</script>

<style scoped>

</style>