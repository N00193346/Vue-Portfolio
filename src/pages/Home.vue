<template>
  <v-container>
    <h1>Home</h1>

    <v-layout row wrap>
      <v-flex sm6 lg6 v-for="project in projects" :key="project.id">
        <v-card elevation="2" outlined class="ma-3">
          <v-img
            height="250"
            src="https://bulma.io/images/placeholders/1280x960.png"
          ></v-img>

          <v-card-title>{{ project.title }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-chip v-for="tag in project.tags" :key="tag">{{ tag }}</v-chip>
            </v-row>

            <div></div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="secondary"> Github </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.getAllProjects();
  },
  created() {
    document.title = "Portfolio";
  },

  methods: {
    getAllProjects() {
      fetch("./data/projects.json")
        .then((res) => res.json())
        .then((data) => {
          console.log("projects: ", data);
          this.projects = data;
        });
    },
  },
};
</script>
<style scoped></style>
