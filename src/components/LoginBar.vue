<template>
  <div>
    <v-app-bar color="primary accent" dark app>
      <v-app-bar-nav-icon>
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>

      <v-toolbar-title>DeltaSphere Computing services</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="email">
            <v-list-item-title>{{ email }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!email" :href="loginUrl">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="email" :href="logoutUrl">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
// import * as Cookies from 'tiny-cookie'
import { mapActions } from 'vuex'

const loginUrl = process.env.VUE_APP_SERVER_URL

export default {
  name: 'login-toolbar',
  data () {
    return {
      email: null
    }
  },
  mounted () {
    this.getUser()
    this.loadProcesses()
  },

  computed: {
    loginUrl () {
      return `${loginUrl}/login`
    },
    logoutUrl () {
      return `${loginUrl}/logout`
    }
  },

  methods: {
    ...mapActions(['loadProcesses']),
    logout () {
      fetch(`${loginUrl}/logout`)
        .then(response => {
          return response.text()
        })
        .then(data => {
          this.email = null
        })
        .catch(error => {
          console.error('Error logout', error)
        })
    },
    getUser () {
      fetch(`${loginUrl}/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.email = data.email
        })
        .catch(error => {
          console.error('Error login', error)
        })
    }
  }
}
</script>

<style lang="css" scoped></style>
