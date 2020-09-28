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
      fetch(`${process.env.VUE_APP_SERVER_URL}/openapi.json`)
        .then(res => {
          console.log(res, res.json, res.json())
          return res.json()
        })
        .then(response => {
          console.log(response, response.components.schemas)
          // save the openapi spec as documenatation
          store.state.schemas = response.components.schemas
          console.log(store.state.schemas)
        })
    },
    loadProcesses (store) {
      fetch(`${process.env.VUE_APP_SERVER_URL}/processes`, {
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
    loadProcessJobs (state) {
      this.state.processes.forEach(proc => {
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
    getProcessInputPerModel (state, model) {
      console.log('test', this.state.processes)
      const process = this.state.processes.find(p => p.id === model)
      this.state.processInput = this.state.schemas[process.inputs.type]
      console.log(
        process.inputs.type,
        this.state.processInput,
        this.state.schemas
      )
    }
  },
  modules: {}
})
