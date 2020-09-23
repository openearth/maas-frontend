<template>
  <v-app>
    <LoginBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LoginBar from './components/LoginBar'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    LoginBar
  },

  data: () => ({
    //
  }),
  mounted () {
    this.loadOpenAPI()
  },
  methods: {
    ...mapActions(['loadOpenAPI'])
  }
}
</script>
