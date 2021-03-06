import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateModel from '../views/CreateModel.vue'
import ModelDetails from '../views/ModelDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createmodel/:model',
    name: 'Create Model',
    component: CreateModel
  },
  {
    path: '/modeldetails/:model/:jobId',
    name: 'Model Details',
    component: ModelDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
