import { shallowMount } from '@vue/test-utils'
import CreateModel from '@/views/CreateModel.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('CreateModel.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CreateModel, {
      mocks: {
        $store: {
          state: {
            processes: []
          }
        }
      }
    })
  })

  it('Initializes CreateModel properly', () => {
    expect(wrapper.find('.create-model').exists()).toBe(true)
  })
})
