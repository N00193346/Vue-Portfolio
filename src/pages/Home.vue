<template>
  <v-container>
    <h1 class="textStyle d-flex justify-center">Paul Doyle</h1>
    <h3 class="textStyle2 d-flex justify-center">
      Third Year Creative Computing Student at IADT
    </h3>
    <h3 class="textStyle2 d-flex justify-center">
      Front-End Developer at Webspace
    </h3>
    <h5 class="textStyle3 d-flex justify-center">
      Use the tags to filter projects by skill/technology.
    </h5>

    <v-layout row class="mt-4 mb-2 d-flex justify-center">
      <v-chip @click="filterVue()" class="ml-3 mr-3">Vue</v-chip>

      <v-chip @click="filterAPI()" class="ml-3 mr-3">API</v-chip>

      <v-chip @click="filterJavaScript()" class="ml-3 mr-3">JavaScript</v-chip>

      <v-chip @click="filterP5()" class="ml-3 mr-3">P5</v-chip>

      <v-chip @click="filterKotlin()" class="ml-3 mr-3">Kotlin</v-chip>

      <v-chip @click="filterFlutter()" class="ml-3 mr-3">Flutter</v-chip>

      <v-chip @click="filterHTML()" class="ml-3 mr-3">HTML</v-chip>

      <v-chip @click="filterPHP()" class="ml-3 mr-3">PHP</v-chip>
    </v-layout>

    <v-layout row wrap>
      <v-flex sm6 lg6 v-for="project in filtered" :key="project.id">
        <v-card color="#cacaca" elevation="2" outlined class="ma-3">
          <v-card-title>{{ project.title }}</v-card-title>
          <v-img
            height="400"
            v-if="`${project.images[0]}`"
            :src="require(`../assets/images/${project.images[0]}`)"
          ></v-img>

          <v-card-text>
            <v-row align="center mt-2 mb-2">
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
      input: "",
      Vue: "Vue",
      API: "API",
      JavaScript: "JavaScript",
      P5: "P5",
      Kotlin: "Kotlin",
      Flutter: "Flutterthis.",
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
    filterP5() {
      if (this.searchQuery != "P5") {
        this.searchQuery = "P5";
      } else {
        this.searchQuery = "";
      }
    },
    filterKotlin() {
      if (this.searchQuery != "Kotlin") {
        this.searchQuery = "Kotlin";
      } else {
        this.searchQuery = "";
      }
    },
    filterFlutter() {
      if (this.searchQuery != "Flutter") {
        this.searchQuery = "Flutter";
      } else {
        this.searchQuery = "";
      }
    },
    filterHTML() {
      if (this.searchQuery != "HTML") {
        this.searchQuery = "HTML";
      } else {
        this.searchQuery = "";
      }
    },
    filterPHP() {
      if (this.searchQuery != "PHP") {
        this.searchQuery = "PHP";
      } else {
        this.searchQuery = "";
      }
    },
    filterTag(tag) {
      if (this.searchQuery != tag) {
        this.searchQuery = tag;
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
  font-size: 72px;

  /* font-family: 'Lato', sans-serif; */
}

.textStyle2 {
  color: #cacaca;
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
}

.textStyle3 {
  color: #8a8a8a;
  font-family: "Lato", sans-serif;
}

.cardStyle {
  background-color: #cacaca;
}
</style>
