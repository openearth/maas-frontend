<template>
  <v-container>
    <div>
      <h2 class="h3 mb-3 justify-start">
        Model details for job: {{ $route.params.jobId }} (model:
        {{ $route.params.model }})
      </h2>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted () {
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
        console.log('Success fetching job per process_id', data)
      })
      .catch(error => {
        console.error('Error fetching job per process_id', error)
      })
  }
}
</script>

<style lang="css" scoped></style>
