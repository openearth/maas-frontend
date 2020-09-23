<template>
  <v-container>
    <div>
      <h2 class="h3 mb-3 justify-start">
        Show data available on s3 bucket
      </h2>
      <v-treeview :items="files"></v-treeview>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      files: []
    }
  },
  mounted () {
    fetch(
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
        data.forEach((file, index) => {
          this.files.push({ id: index, name: file })
        })
      })
      .catch(error => {
        console.error('Error fetching files', error)
      })
  }
}
</script>

<style lang="css" scoped></style>
