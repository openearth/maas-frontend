import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#33A5D0',
        accepted: '#29B6F6',
        running: '#26A69A',
        succeeded: '#66BB6A',
        failed: '#EF5350',
        dismissed: '#78909C'
      }
    }
  },
  options: {
    customProperties: true
  }
})
