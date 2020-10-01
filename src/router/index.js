import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateModel from '../views/CreateModel.vue'
import ModelDetails from '../views/ModelDetails.vue'
import DataDetails from '../views/DataDetails.vue'
import UsageDetails from '../views/UsageDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      windowRedirectAfter: true
    }
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
  },
  {
    path: '/data',
    name: 'Data Details',
    component: DataDetails
  },
  {
    path: '/data/:prefix',
    name: 'Data Details',
    component: DataDetails
  },
  {
    path: '/usage',
    name: 'Usage Details',
    component: UsageDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
