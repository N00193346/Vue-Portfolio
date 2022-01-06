<template>
  <div>
    <v-container class="my-5">
      <v-card class="ma-3" elevation="5" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h3 mb-1">
              {{ lecturer.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="fontSize">
              <div class="subheading">Id:</div>
              {{ lecturer.id }}
              <div class="subheading">Address:</div>
              {{ lecturer.address }}
              <div class="subheading">Rmail:</div>
              {{ lecturer.email }}
              <div class="subheading">Phone:</div>
              {{ lecturer.phone }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <router-link :to="{ name: 'lecturers_edit' }">
            <v-btn
              outlined
              rounded
              text
              color="white"
              class="buttonEdit button pa-5"
            >
              Edit
            </v-btn>
          </router-link>

          <!-- <v-btn        
        outlined
        rounded
        text
        color="white"
        class="buttonDelete button"
      >
       Delete
      </v-btn> -->

          <DeletePopUp
            :button="this.button"
            :enrolments="this.enrolments"
            :type="this.type"
          />
          <div class="errorText">{{ errors }}</div>
        </v-card-actions>
      </v-card>

      <v-card class="ma-3" elevation="5" outlined>
        <v-list-item three-line v-if="this.enrolments.length > 0">
          <v-list-item-content>
            <v-list-item-title class="text-h3 mb-5">
              {{ lecturer.name }}'s Enrolments
            </v-list-item-title>

            <v-layout row wrap>
              <v-flex
                sm6
                lg6
                v-for="enrolment in enrolments"
                :key="enrolment._id"
              >
                <v-card elevation="2" outlined class="ma-5" max-width="500">
                  <router-link
                    style="text-decoration: none; color: inherit"
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

                    <div class="d-flex justify-start">
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
                  </router-link>
                </v-card>
              </v-flex>
            </v-layout>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import DeletePopUp from "@/components/DeletePopUp";

export default {
  name: "LecturersShow",
  components: {
    DeletePopUp,
  },
  data() {
    return {
      lecturer: {},
      enrolments: [],
      type: "lecturer",
      errors: "",
      button: {
        id: this.$route.params.id,
        class: "button pa-5",
        message: "Are you sure you want to delete this lecturer?",
      },
    };
  },
  created() {
    document.title = "Lecturer Show";
  },
  mounted() {
    this.getLecturer();
    this.getEnrolments();
  },
  methods: {
    getLecturer() {
      let token = localStorage.getItem("token");
      axios
        .get(
          `https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          this.lecturer = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          //  localStorage.removeItem('token')
          //  this.$emit('invalid-token')
        });
    },
    getEnrolments() {
      let token = localStorage.getItem("token");
      axios
        .get(
          `https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          this.enrolments = response.data.data.enrolments;
          if (this.enrolments.length > 0) {
            this.button.message =
              "Deleting this lecturer will delete all enrolments related to the lecturer, are you sure you want to delete it?";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.button {
  margin-left: 20px;
  margin-bottom: 10px;
}

.buttonEdit {
  background: #f9aa33 !important;
}

.buttonDelete {
  background: red !important;
}

.subheading {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
  color: black;
}
.fontSize {
  font-size: 20px;
  margin: 10px;
}
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
</style>
