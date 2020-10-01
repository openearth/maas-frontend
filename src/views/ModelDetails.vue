<template>
  <div class="model-details pa-3 d-flex flex-column">
    <h2 class="h3 mb-3 justify-start">
      Model details for job: {{ jobDetails.title }} (workflow:
      {{ $route.params.model }})
    </h2>
    <data-table :tableHeaders="tableHeaders" :tableItems="detailItems"/>
    <h2 class="mt-4">
      Model results
    </h2>
    <data-table :tableHeaders="tableHeaders" :tableItems="resultItems"/>

  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  data () {
    return {
      jobDetails: [],
      tableHeaders: [
        {
          text: 'Property',
          align: 'left',
          sortable: false,
          value: 'name',
          width: '50%'
        },
        {
          text: 'Value',
          align: 'left',
          sortable: false,
          value: 'value',
          width: '50%'

        }
      ],
      detailItems: [],
      resultItems: []
    }
  },
  components: {
    DataTable
  },
  mounted () {
    this.fetchJobDetails()
    this.fetchJobResults()
  },
  methods: {
    fetchJobDetails () {
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/processes/${this.$route.params.model}/jobs/${this.$route.params.jobId}`,
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
          this.jobDetails = data
          this.detailItems = []
          Object.entries(data).forEach(val => {
            this.detailItems.push({
              value: val[1],
              name: val[0]
            })
          })
        })
        .catch(error => {
          console.error('Error fetching job per process_id', error)
        })
    },
    fetchJobResults () {
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/processes/${this.$route.params.model}/jobs/${this.$route.params.jobId}/results`,
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
          this.jobResults = data
          this.resultItems = []

          Object.entries(data).forEach(val => {
            if (val[0] === 's3path') {
              val[0] = `<a
  :href="${val[0]}"
  v-text="item.label"
  </a>`
            }
            this.resultItems.push({
              value: val[1],
              name: val[0]
            })
          })
        })
        .catch(error => {
          console.error('Error fetching job per process_id', error)
        })
    }
  }
}
</script>

<style lang="css" scoped></style>
