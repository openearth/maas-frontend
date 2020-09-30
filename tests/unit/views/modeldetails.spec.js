import { shallowMount } from '@vue/test-utils'
import ModelDetails from '@/views/ModelDetails.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('ModelDetails.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ModelDetails, {
      mocks: {
        $route: {
          params: {
            model: 'foo',
            jobId: 'bar'
          }
        }
      }
    })
  })

  it('Initializes ModelDetails properly', () => {
    expect(wrapper.find('.model-details').exists()).toBe(true)
  })
})
