<template>
  <div>
    <v-container class="my-5">
      <v-layout row class="d-flex justify-space-between">
        <h1 class="subheading">Enrolments</h1>
        <router-link :to="{ name: 'enrolments_create' }">
          <v-btn
            v-if="loggedIn"
            outlined
            color="white"
            class="secondary button pa-2 mt-3 mr-3"
          >
            Add Enrolment
          </v-btn>
        </router-link>
      </v-layout>

      <v-layout row>
        <v-img :src="heroImage" height="350" class="ma-3" />
      </v-layout>

      <div v-if="!loggedIn">
        <h2 class="mt-2 d-flex justify-center">
          You need to be logged in to view enrolments
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
            label="Search Enrolments"
            outlined
            clearable
            @click:clear="clear()"
          ></v-text-field>
        </v-layout>

        <v-layout row class="mb-3">
          <h5 class="ml-3">Filter:</h5>
          <br />
          <v-chip
            @click="filterInterested()"
            small
            opacity=".1"
            class="interested ml-3 mr-3"
            >Interested</v-chip
          >

          <v-chip @click="filterAssigned()" small class="assigned ml-3 mr-3"
            >Assigned</v-chip
          >

          <v-chip @click="filterAssociate()" small class="associate ml-3 mr-3"
            >Associate</v-chip
          >

          <v-chip @click="filterCareer()" small class="career_break ml-3 mr-3"
            >Career Break</v-chip
          >
        </v-layout>

        <div v-if="filtered.length">
          <paginate
            class="paginateW"
            name="enrolments"
            :list="filtered"
            :per="10"
          >
            <v-layout row wrap>
              <v-flex
                sm6
                lg6
                v-for="enrolment in paginated('enrolments')"
                :key="enrolment._id"
              >
                <!-- <v-flex sm6 lg6 v-for="enrolment in filtered" :key="enrolment._id"> -->

                <v-card elevation="2" outlined class="ma-3">
                  <router-link
                    style="text-decoration: none; color: inhaerit"
                    :to="{
                      name: 'enrolments_show',
                      params: { id: enrolment.id },
                    }"
                  >
                    <v-card-title class="d-flex justify-space-between">
                      {{ enrolment.course.title }}
                      <v-chip small :class="`${enrolment.status}`">{{
                        enrolment.status
                      }}</v-chip>
                    </v-card-title>

                    <v-card-subtitle>
                      {{ enrolment.lecturer.name }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </router-link>

                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header> </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="d-flex justify-start mt-n5">
                          <v-card-text>
                            <div class="textStyle">Enrolment ID:</div>
                            {{ enrolment.id }}
                          </v-card-text>
                          <v-card-text>
                            <div class="textStyle">Course ID:</div>
                            {{ enrolment.course_id }}
                          </v-card-text>
                          <v-card-text>
                            <div class="textStyle">Lecturer ID:</div>
                            {{ enrolment.lecturer_id }}
                          </v-card-text>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-flex>
            </v-layout>
          </paginate>
        </div>

        <v-layout row>
          <paginate-links
            for="enrolments"
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
  "https://api.unsplash.com/search/photos/?client_id=XhqXA2Jig1drfBj96ploqpKdat9N94vn0GPzbrYjwK8&query=class";

export default {
  name: "EnrolmentsIndex",
  components: {},
  data() {
    return {
      show: false,
      enrolments: [],
      heroImage: {},
      searchQuery: "",
      paginate: ["enrolments"],
      page: 1,
    };
  },
  created() {
    document.title = "Enrolment Index";
  },
  computed: {
    ...mapState(["loggedIn"]),

    filtered() {
      return this.enrolments.filter((enrolment) => {
        return (
          enrolment.status
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          enrolment.course.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          enrolment.lecturer.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.getData();
    this.getHeroImage();
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      axios
        .get(`https://college-api-mo.herokuapp.com/api/enrolments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Enollments response :" + response.data.data);
          this.enrolments = response.data.data;
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
    filterInterested() {
      this.searchQuery = "interested";
    },
    filterAssigned() {
      this.searchQuery = "assigned";
    },
    filterAssociate() {
      this.searchQuery = "associate";
    },
    filterCareer() {
      this.searchQuery = "career_break";
    },
  },
};
</script>
<style>
.textStyle {
  font-weight: bold;
  text-decoration: none;
}

.v-chip.interested {
  background: #f9aa33 !important;
}

.v-chip.assigned {
  background: #82b1ff !important;
}

.v-chip.career_break {
  background: red !important;
}

.v-chip.associate {
  background: #4caf50 !important;
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
