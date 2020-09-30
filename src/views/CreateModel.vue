<template>
  <div class="ma-3">
    <div v-if="processInput">
      <h2 class="h3 mb-3 justify-start">
        Create new model: {{ $route.params.model }}
      </h2>
      <v-form>
        <v-row
          v-for="parameter in processInput.properties"
          :key="parameter.name"
        >
          <!-- Set bounding box -->
          <v-row v-if="parameter.title === 'Bbox'" class="px-3">
            <v-text-field
              v-for="(val, key) in parameter.default"
              :key="key"
              dense
              readonly
              :label="key"
              class="px-3"
              :value="val"
            ></v-text-field>
          </v-row>

          <!-- Use a text field for string or integer input -->
          <v-text-field
            v-if="
              (parameter.type === 'string' || parameter.type === 'integer') &&
                !parameter.enum &&
                !parameter.title === 'S3 Path'
            "
            dense
            :label="parameter.title"
            v-model="parameter.default"
            class="px-3"
          ></v-text-field>

          <!-- use a combobox whenever a enumerate object is passed -->
          <v-combobox
            class="px-3"
            :items="parameter.enum"
            v-if="parameter.enum"
            v-model="parameter.value"
            :label="parameter.title"
            item-value="parameter.default"
            dense
          ></v-combobox>

          <!-- use a file input whenever a file input is required -->
          <v-row v-if="parameter.title === 'S3 Path'" class="mx-3">
            <v-combobox
              class="px-3"
              :items="files"
              v-model="parameter.value"
              :label="parameter.title"
              item-value="parameter.default"
              item-text="name"
              dense
            ></v-combobox>
            <v-btn
              bottom
              color="primary"
              outlined
              to="/data"
            >
              Upload new file to bucket
            </v-btn>

          </v-row>
        </v-row>
      </v-form>
      <v-row class="pa-3 justify-end">
        <v-btn
          bottom
          color="primary"
          :disabled="!validateInputs"
          outlined
          @click="createSchematization"
        >
          Create schematization
        </v-btn>
      </v-row>
    </div>
    <div v-else>
      <span class="pa-3">
        Loading model input..
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    model: {
      type: String
    }
  },
  computed: {
    ...mapState(['processInput', 'processes', 'schemas', 'files']),
    validateInputs () {
      const inputs = Object.keys(this.processInput.properties).map(input => input.default)
      return !inputs.includes('')
    }
  },
  watch: {
    schemas (newVal, oldVal) {
      this.getProcessInputPerModel(this.$route.params.model)
    }
  },
  data () {
    return {
      jobId: ''
    }
  },
  mounted () {
    if (this.schemas) {
      this.getProcessInputPerModel(this.$route.params.model)
    }
    this.loadFiles()
  },
  methods: {
    ...mapActions(['getProcessInputPerModel', 'loadFiles']),
    createSchematization () {
      // TODO: convert to input of the job create
      const body = {
        s3path: this.jobId
      }
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/processes/${this.$route.params.model}/jobs`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(body)
        }
      )
        .then(res => {
          return res.json()
        })
        .then(response => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style lang="css" scoped></style>
