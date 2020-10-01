import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processInput: null,
    processes: [],
    schemas: null,
    files: []
  },
  mutations: {},
  actions: {
    loadOpenAPI (store) {
      // Get the openapi json to retrieve the template per model.
      const url = process.env.VUE_APP_SERVER_URL.split('/v1')[0]
      return fetch(`${url}/openapi.json`)
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
    loadFiles (store) {
      return fetch(
        `${process.env.VUE_APP_SERVER_URL}/files`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          return response.json()
        })
        .then(data => {
          const files = []
          data.forEach((file, index) => {
            files.push({ id: index, name: file, file: true })
          })
          store.state.files = files
        })
        .catch(error => {
          console.error('Error fetching files', error)
        })
    },
    getProcessInputPerModel (state, model) {
      const process = this.state.processes.find(p => p.id === model)
      this.state.processInput = this.state.schemas[process.inputs.type]
    }
  },
  modules: {}
})
