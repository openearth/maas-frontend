import { shallowMount } from '@vue/test-utils'
import CreateModel from '@/views/CreateModel.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(Vuex)

const actions = {
  loadFiles: jest.fn()
}

const state = {
  processInput: null,
  processes: [],
  schemas: null,
  files: []
}
const store = new Vuex.Store({ actions, state })

describe('CreateModel.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CreateModel, {
      store
    })
  })

  it('Initializes CreateModel properly', () => {
    expect(wrapper.find('.create-model').exists()).toBe(true)
  })
})
