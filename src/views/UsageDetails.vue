<template>
  <div class="model-details pa-3 d-flex flex-column">
    <h2 class="h3 mb-3 justify-start">
      Usage details
    </h2>
    <div v-for="items in usageData" :key="items.title">
      <h2 class="h3 mb-3 justify-start">
        {{items.title}}
      </h2>
      <data-table :tableHeaders="tableHeaders" :tableItems="items.usageItems"/>
    </div>
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
          text: 'Usage',
          align: 'left',
          sortable: false,
          value: 'value',
          width: '50%'
        }
      ],
      usageData: []
    }
  },
  components: {
    DataTable
  },
  mounted () {
    this.fetchUsage()
  },
  methods: {
    fetchUsage () {
      fetch(
        `${process.env.VUE_APP_SERVER_URL}/usage`,
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
          console.log(data)
          this.usageData = []

          Object.entries(data).forEach(item => {
            const usageItems = []
            Object.entries(item[1]).forEach(val => {
              usageItems.push({
                value: val[1],
                name: val[0]
              })
            })
            this.usageData.push({
              title: item[0],
              usageItems: usageItems
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
