import { shallowMount } from '@vue/test-utils'
import LoginBar from '@/components/LoginBar.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(Vuex)

const actions = {
  loadProcesses: jest.fn()
}
const store = new Vuex.Store({ actions })

describe('LoginBar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(LoginBar, {
      store
    })
  })

  it('Initializes LoginBar properly', () => {
    expect(wrapper.find('.login-bar').exists()).toBe(true)
  })
})
