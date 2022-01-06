<template>
  <div>
    <v-container class="my-5">
      <v-layout row class="d-flex justify-space-between">
        <h1 class="subheading">Lecturers</h1>
        <router-link :to="{ name: 'lecturers_create' }">
          <v-btn
            v-if="loggedIn"
            outlined
            color="white"
            class="secondary button pa-2 mt-3 mr-3"
          >
            Add Lecturer
          </v-btn>
        </router-link>
      </v-layout>

      <v-layout row>
        <v-img :src="heroImage" height="350" class="ma-3" />
      </v-layout>

      <div v-if="!loggedIn">
        <h2 class="mt-2 d-flex justify-center">
          You need to be logged in to view lecturers
        </h2>
        <br />
        <h2 class="mt-2 d-flex justify-center">
          <router-link :to="{ name: 'home' }">
            <v-btn flat x-large class="secondary mt-3">Log In </v-btn>
          </router-link>
        </h2>
      </div>

      <div v-else>
        <v-layout row class="mt-2">
          <v-text-field
            class="ml-3 mr-3"
            v-model="searchQuery"
            label="Search Lecturers"
            outlined
            clearable
            @click:clear="clear()"
          ></v-text-field>
        </v-layout>

        <div v-if="filtered.length">
          <paginate
            class="paginateW"
            name="lecturers"
            :list="filtered"
            :per="10"
          >
            <v-layout row wrap>
              <v-flex
                sm6
                lg6
                v-for="lecturer in paginated('lecturers')"
                :key="lecturer.id"
              >
                <router-link
                  style="text-decoration: none; color: inherit"
                  :to="{ name: 'lecturers_show', params: { id: lecturer.id } }"
                >
                  <v-card elevation="2" outlined class="ma-3">
                    <v-card-title class="d-flex justify-space-between">
                      <div class="textStyle">{{ lecturer.name }}</div>
                      <v-icon x-large>mdi-account-circle</v-icon>
                    </v-card-title>
                    <div class="d-flex justify-space-between">
                      <v-card-text>
                        <div class="textStyle">Email:</div>
                        {{ lecturer.email }}
                      </v-card-text>
                      <v-card-text>
                        <div class="textStyle">Phone:</div>
                        {{ lecturer.phone }}
                      </v-card-text>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
            </v-layout>
          </paginate>
        </div>

        <v-layout row>
          <paginate-links
            for="lecturers"
            style="width: 100%; justify-content: center"
            class="d-flex justify-space-between"
            :show-step-links="true"
            :step-links="{
              prev: '<',
              next: '>',
            }"
          ></paginate-links>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const UNSPLASH_URL =
  "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=college+class";

export default {
  name: "LecturersIndex",
  components: {},
  data() {
    return {
      lecturers: [],
      heroImage: {},
      searchQuery: "",
      paginate: ["lecturers"],
    };
  },
  created() {
    document.title = "Lecturer Index";
  },
  mounted() {
    this.getData();
    this.getHeroImage();
  },
  computed: {
    ...mapState(["loggedIn"]),
    filtered() {
      return this.lecturers.filter((lecturer) => {
        return (
          lecturer.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          lecturer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      axios
        .get(`https://college-api-mo.herokuapp.com/api/lecturers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          this.lecturers = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    getHeroImage() {
      axios
        .get(`${UNSPLASH_URL}`)
        .then((response) => {
          console.log(response);
          this.heroImage = response.data.results[0].urls.regular;
          console.log("Image Url is:" + this.heroImage);
        })

        .catch((error) => console.log(error));
    },
    clear() {
      this.searchQuery = "";
    },
  },
};
</script>
<style>
.textStyle {
  font-weight: bold;
  text-decoration: none;
}

.paginateW {
  width: 100%;
  padding-left: 0 !important;
}

ul.paginate-links {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  padding-left: 0 !important;
}

li.number > a,
.left-arrow,
.right-arrow {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 32px;
  width: 32px;
  margin: 0.3rem 10px;
}
</style>
