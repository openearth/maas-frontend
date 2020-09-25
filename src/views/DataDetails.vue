<template>
  <div class="data-details pa-3 d-flex flex-column">
    <h2 class="h3 mb-3 justify-start">
      Show data available on s3 bucket
    </h2>
    <v-card class="py-0 flex-grow-1 flex-shrink-0">
      <v-treeview :items="files"></v-treeview>
    </v-card>

    <v-row md-2 class="ma-3 flex-grow-0 flex-shrink-1">

      <v-file-input
        dense
        multiple
        v-model="fileInput"
        label="Upload data to s3 bucket"
        class="pr-3"
        :hint="uploadMessage"
        @input="uploadStatus === 'input'"
        persistent-hint
      ></v-file-input>
      <v-btn
        v-if="uploadStatus === 'input'"
        bottom
        :disabled="fileInput === ''"
        color="primary"
        outlined
        @click="getUploadCredentials(fileInput)"
      >
        Upload to bucket
      </v-btn>
      <v-progress-circular
        v-if="inputStatus === 'upload'"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: [],
      fileInput: '',
      uploadStatus: 'input'
    }
  },
  computed: {
    uploadMessage () {
      if (this.uploadStatus === 'input') {
        if (this.fileInput === '') {
          return 'Add .tar file to upload.'
        } else {
          return 'Ready to upload file'
        }
      } else if (this.uploadStatus === 'error') {
        return 'An error has occured, please try again'
      } else if (this.uploadStatus === 'error') {
        return 'Succes uploading file!'
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.fetchFiles()
  },
  methods: {
    fetchFiles () {
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
    getUploadCredentials (file) {
      this.uploadStatus = 'upload'
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
        .catch(() => {
          this.uploadStatus = 'error'
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
          this.uploadStatus = 'succes'
          this.createJob = true
          this.jobId = file.name
          this.fetchFiles()
        })
        .catch(() => {
          this.uploadStatus = 'error'
        })
    }
  }
}
</script>

<style lang="css" scoped>
.data-details {
  height: 100%;
}
</style>
