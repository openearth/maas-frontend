<template>
  <div class="ma-3">
    <h2 class="h3 mb-3 justify-start">
      Show data available on s3 bucket
    </h2>
    <v-treeview :items="files"></v-treeview>
    <v-row class="mx-3">
      <v-file-input
        dense
        multiple
        v-model="fileInput"
        label="Upload data to s3 bucket"
        class="pr-3"
      ></v-file-input>
      <v-btn
        bottom
        :disabled="fileInput === ''"
        color="primary"
        outlined
        @click="getUploadCredentials(fileInput)"
      >
        Upload to bucket
      </v-btn>
    </v-row>
  </div>
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
  },
  methods: {
    getUploadCredentials (file) {
      fetch(`${process.env.VUE_APP_SERVER_URL}/files/${file[0].name}`, {
        method: 'POST',
        credentials: 'include'
      })
        .then(res => {
          return res.json()
        })
        .then(response => {
          this.upload2s3(response, file[0])
        })
    },
    async upload2s3 (response, file) {
      const form = new FormData()
      Object.keys(response.fields).forEach(key =>
        form.append(key, response.fields[key])
      )
      form.append('file', file)
      fetch(response.url, {
        method: 'POST',
        body: form
      })
        .then(res => {
          return res.text()
        })
        .then(response => {
          console.log('Succes uploading to s3 bucket')
          this.createJob = true
          this.jobId = file.name
        })
    }
  }
}
</script>

<style lang="css" scoped></style>
