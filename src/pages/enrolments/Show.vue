<template>
  <div>
    <v-container class="my-5">
      <!-- <router-link :to="{name: 'enrolments_edit'}"><button type="button" class="btn btn-primary">Edit</button></router-link> -->
      <!-- <button @click="deleteCourse()" type="button" class="btn btn-danger">Delete Course</button> -->
      <v-card class="ma-3" elevation="5" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h3 mb-1">
              Enrolment
            </v-list-item-title>
            <v-list-item-subtitle class="fontSize">
              <div class="subheading">Id:</div>
              {{ enrolment.id }}
              <div class="subheading">Date:</div>
              {{ enrolment.date }}
              <div class="subheading">Time:</div>
              {{ enrolment.time }}
              <div class="subheading">Course Id:</div>
              {{ enrolment.course_id }} ({{ enrolment.course.title }})
              <div class="subheading">Lecturer Id:</div>
              {{ enrolment.lecturer_id }} ({{ enrolment.lecturer.name }})
              <div class="subheading">Status:</div>
              {{ enrolment.status }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <router-link :to="{ name: 'enrolments_edit' }">
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

          <DeletePopUp
            :button="this.button"
            :enrolments="0"
            :type="this.type"
          />
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import DeletePopUp from "@/components/DeletePopUp";

export default {
  name: "EnrolmentsShow",
  components: {
    DeletePopUp,
  },
  data() {
    return {
      enrolment: {},
      type: "enrolment",
      errors: "",
      button: {
        id: this.$route.params.id,
        class: "button pa-5",
        message: "Are you sure you want to delete this enrolment?",
      },
    };
  },
  mounted() {
    this.getData();
  },
  created() {
    document.title = "Enrolment Show";
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      axios
        .get(
          `https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          this.enrolment = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          //  this.$emit('invalid-token')
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
