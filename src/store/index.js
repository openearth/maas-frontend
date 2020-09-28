import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processInput: null,
    processes: [],
    schemas: null
  },
  mutations: {},
  actions: {
    loadOpenAPI (store) {
      // Get the openapi json to retrieve the template per model.
      return fetch(`${process.env.VUE_APP_SERVER_URL}/openapi.json`)
        .then(res => {
          return res.json()
        })
        .then(response => {
          // save the openapi spec as documenatation
          store.state.schemas = response.components.schemas
        })
    },
    loadProcesses (store) {
      return fetch(`${process.env.VUE_APP_SERVER_URL}/processes`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          store.state.processes = data
          store.dispatch('loadProcessJobs')
        })
        .catch(error => {
          console.error('Error processes', error)
        })
    },
    loadProcessJobs (store) {
      store.state.processes.forEach(proc => {
        fetch(`${process.env.VUE_APP_SERVER_URL}/processes/${proc.id}/jobs`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            proc.jobs = data
          })
          .catch(error => {
            console.error('Error processes', error)
          })
      })
    },
    getProcessInputPerModel (store, model) {
      const process = store.state.processes.find(p => p.id === model)
      store.state.processInput = store.state.schemas[process.inputs.type]
    }
  },
  modules: {}
})
