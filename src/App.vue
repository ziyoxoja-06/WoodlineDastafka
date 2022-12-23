<template>

  <v-app >
    <component :is="layout">
      <router-view/>
    </component>

  </v-app>


</template>

<script>
import {EmptyLayout} from "@/layouts";
import {MainLayout} from "@/layouts";
export default {
  name: 'App',
  computed:{
    layout(){
      return (this.$route.meta.layout || 'empty')+'-layout'
    }
  },
  components:{
    EmptyLayout,MainLayout
  },
  data: () => ({

  }),
  async maunted(){
    setTimeout(()=>{
      this.loading=false
    },200)
  },
};
</script>
