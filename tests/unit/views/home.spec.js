import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Home.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      mocks: {
        $store: {
          state: {
            processes: []
          }
        }
      }
    })
  })

  it('Initializes home properly', () => {
    expect(wrapper.find('.home').exists()).toBe(true)
  })
})
