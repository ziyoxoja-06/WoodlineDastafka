import Vue from 'vue'
import VueRouter from 'vue-router'
import {HomeView,DragAndDrop,UserPage} from "@/views";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta:{layout:'main', auth:true},
    component: HomeView
  },
  {
    path: '/drag',
    name: 'DragDrop',
    meta:{layout:'main', auth:true},
    component: DragAndDrop
  },
  {
    path: '/supplier',
    name: 'DeliveryMainPage',
    meta:{layout:'main', auth:true},
    component: UserPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
