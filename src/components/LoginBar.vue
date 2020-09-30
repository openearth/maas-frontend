<template>
  <div class="login-bar">
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

      <v-btn icon to="/data">
        <v-icon>mdi-folder-account-outline</v-icon>
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
export default {
  name: 'login-toolbar',
  data () {
    return {
      email: null
    }
  },
  mounted () {
    if (window.location.search) {
      this.authenticateSession()
    } else {
      this.getUser()
    }
  },

  computed: {
    authUrl () {
      return `${process.env.VUE_APP_SERVER_URL}/auth${window.location.search}`
    },
    loginUrl () {
      return `${process.env.VUE_APP_SERVER_URL}/login?redirect_uri=${window.location.origin}`
    },
    logoutUrl () {
      return `${process.env.VUE_APP_SERVER_URL}/logout`
    }
  },

  methods: {
    authenticateSession () {
      window.location.assign(this.authUrl)
    },
    getUser () {
      fetch(`${process.env.VUE_APP_SERVER_URL}/me`, {
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
