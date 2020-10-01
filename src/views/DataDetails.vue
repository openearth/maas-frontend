<template>
  <div class="data-details pa-3 d-flex flex-column">
    <h2 class="h3 mb-3 justify-start">
      Show data available on s3 bucket
    </h2>
    <v-card class="py-0 flex-grow-1 flex-shrink-0">
      <v-treeview hoverable :items="files">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ 'mdi-file-document-outline' }}
          </v-icon>
        </template>
        <template slot="append" slot-scope="{item}">
          <v-btn color="primary" icon @click="deleteFile(item)">
            <v-icon dark>
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
      </v-treeview>
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
    v-if="uploadStatus === 'upload'"
    indeterminate
    color="primary"
    ></v-progress-circular>
  </v-row>

    <v-btn
      color="primary"
      @click="$router.go(-1)"
    >
      back
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      fileInput: {},
      uploadStatus: 'input'
    }
  },
  computed: {
    ...mapState(['files']),
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
    this.loadFiles()
  },
  methods: {
    ...mapActions(['loadFiles']),
    deleteFile (file) {
      fetch(`${process.env.VUE_APP_SERVER_URL}/files/${file.name}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.loadFiles()
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
          this.uploadStatus = 'succes'
          this.createJob = true
          this.jobId = file.name
          this.loadFiles()
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
