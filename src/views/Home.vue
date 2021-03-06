<template>
  <v-container class="py-0" fluid>
    <v-row justify="center" v-if="processes.length > 0">
      <v-expansion-panels v-model="panels" accordion multiple>
        <v-expansion-panel v-for="(proc, i) in processes" :key="i">
          <v-expansion-panel-header
            >Running models for: {{ proc.id }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>
              <v-col
                v-for="job in proc.jobs"
                cols="2"
                sm="3"
                class="pa-3"
                :key="job.title"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    height="300px"
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                    v-ripple
                    :to="`/modeldetails/${proc.id}/${job.jobID}`"
                  >
                    <v-card-title class="headline font-weight-bold">{{
                      job.jobID
                    }}</v-card-title>
                    <v-card-text>
                      {{ job.message }}
                    </v-card-text>

                    <v-card-text>
                      Status: {{ job.status }}
                      <v-progress-linear
                        :color="job.status"
                        height="10"
                        :value="job.progress"
                        striped
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col cols="2" sm="3" class="pa-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        v-on="on"
                        v-ripple
                        height="300px"
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        :to="`/createmodel/${proc.id}`"
                      >
                        <v-row
                          class="fill-height"
                          align="center"
                          justify="center"
                        >
                          <v-icon size="60">mdi-plus-circle-outline</v-icon>
                        </v-row>
                      </v-card>
                    </v-hover>
                  </template>
                  <span>Create a new model</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row v-else>
      <span class="pa-3">
        Welcome to the DeltaSphere Computing services. <br />
        Please login to show model workflows.
      </span>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    panels: []
  }),
  mounted () {
    this.panels = this.processes.map((k, i) => i)
  },
  computed: {
    ...mapState(['processes'])
  }
}
</script>
