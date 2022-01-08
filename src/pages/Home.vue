<template>
  <v-container>
    <h1 class="textStyle">Paul Doyle Portfolio</h1>
    <h3 class="textStyle">Third Year Creative Computing Student at IADT</h3>

    <v-layout row class="mt-4 mb-2">
      <v-chip @click="filterVue()" class="ml-3 mr-3">Vue</v-chip>

      <v-chip @click="filterAPI()" class="ml-3 mr-3">API</v-chip>

      <v-chip @click="filterJavaScript()" class="ml-3 mr-3">JavaScript</v-chip>
    </v-layout>

    <v-layout row wrap>
      <v-flex sm6 lg6 v-for="project in filtered" :key="project.id">
        <v-card color="#cacaca" elevation="2" outlined class="ma-3">
          <v-img
            contain
            height="300"
            v-if="`${project.images[0]}`"
            :src="require(`../assets/images/${project.images[0]}`)"
          ></v-img>

          <v-card-title>{{ project.title }}</v-card-title>

          <v-card-text>
            <v-row align="center">
              <v-chip v-for="tag in project.tags" :key="tag" class="ml-3">{{
                tag
              }}</v-chip>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-n4" style="font-size: 1em"
            >{{ project.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn :href="project.links.github" class="secondary">
              Github
            </v-btn>
            <router-link v-if="project.demo" :to="{ name: project.demo }">
              <v-btn class="ml-5"> Demo</v-btn>
            </router-link>

            <v-btn
              v-if="project.links.hosted"
              :href="project.links.hosted"
              class="ml-5"
              >Hosted</v-btn
            >
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
      searchQuery: "",
    };
  },
  mounted() {
    this.getAllProjects();
  },
  created() {
    document.title = "Portfolio";
  },
  computed: {
    filtered() {
      return this.projects.filter((project) => {
        if (this.searchQuery == "") {
          return project.tags;
        } else {
          return project.tags.includes(this.searchQuery);
        }
      });
    },
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
    filterVue() {
      if (this.searchQuery != "Vue") {
        this.searchQuery = "Vue";
      } else {
        this.searchQuery = "";
      }
    },
    filterAPI() {
      if (this.searchQuery != "API") {
        this.searchQuery = "API";
      } else {
        this.searchQuery = "";
      }
    },
    filterJavaScript() {
      if (this.searchQuery != "JavaScript") {
        this.searchQuery = "JavaScript";
      } else {
        this.searchQuery = "";
      }
    },
  },
};
</script>
<style scoped>
.textStyle {
  color: #cacaca;
  font-family: "Montserrat", sans-serif;

  /* font-family: 'Lato', sans-serif; */
}

.cardStyle {
  background-color: #cacaca;
}
</style>
