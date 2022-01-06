<template>
  <div>
    <v-container class="my-5">
      <v-card>
        <v-card-title class="mb-1">
          <h1>Create Enrolment</h1>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="formR">
            <!-- Status -->
            <!-- <v-select
            v-model="form.status"
            :items="statusItems"
            prepend-icon="mdi-clipboard-check-outline"
            item-text="text"
            item-value="value"
            :rules="[v => !!v || 'Status is required']"
            label="Status"
            required
          ></v-select> -->

            <v-autocomplete
              clearable
              v-model="form.status"
              :items="statusItems"
              prepend-icon="mdi-clipboard-check-outline"
              item-text="text"
              item-value="value"
              :rules="[(v) => !!v || 'Status is required']"
              label="Status"
              required
            ></v-autocomplete>
            <div class="errorText">{{ errors.status }}</div>

            <!-- Course -->
            <!-- <v-select
            v-model="form.course_id"
            :items="courses"
            prepend-icon="folder"
            :rules="[v => !!v || 'Course is required']"    
            item-text="title"
            item-value="id"
            label="Course"
            required
          ></v-select> -->
            <v-autocomplete
              clearable
              v-model="form.course_id"
              :items="courses"
              prepend-icon="folder"
              :rules="[(v) => !!v || 'Course is required']"
              item-text="title"
              item-value="id"
              label="Course"
              required
            ></v-autocomplete>
            <div class="errorText">{{ errors.course_id }}</div>

            <!-- Lecturer -->
            <v-autocomplete
              clearable
              v-model="form.lecturer_id"
              prepend-icon="mdi-account"
              :items="lecturers"
              :rules="[(v) => !!v || 'Lecturer is required']"
              item-text="name"
              item-value="id"
              label="Lecturer"
              required
            ></v-autocomplete>
            <!-- <v-select
            v-model="form.lecturer_id"
            prepend-icon="mdi-account" 
            :items="lecturers"
            :rules="[v => !!v || 'Lecturer is required']"    
            item-text="name"
            item-value="id"
            label="Lecturer"
            required
          ></v-select> -->
            <div class="errorText">{{ errors.lecturer_id }}</div>

            <!-- Date -->
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[(v) => !!v || 'Date is required']"
                  :value="form.date"
                  label="Date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date"></v-date-picker>
            </v-menu>
            <div class="errorText">{{ errors.date }}</div>

            <!-- Time -->
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[(v) => !!v || 'Time is required']"
                  :value="form.time"
                  label="Time"
                  prepend-icon="mdi-clock-outline"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                ampm-in-title
                elevation="15"
                format="ampm"
                v-model="form.time"
              ></v-time-picker>
            </v-menu>
            <div class="errorText">{{ errors.time }}</div>

            <!-- <v-text-field label="Time" v-model="form.time" :rules="[v => !!v || 'Time is required']"   prepend-icon="mdi-clock-outline"></v-text-field> -->

            <v-btn
              flat
              class="secondary mt-3"
              @click="submit + createEnrolment()"
              >Create
            </v-btn>
            <v-btn flat class="accent ml-3 mt-3" @click="clear">Clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EnrolmentsCreate",
  components: {},
  data() {
    return {
      form: {
        status: "",
        course_id: "",
        lecturer_id: "",
        date: "",
        time: "",
      },
      courses: [],
      lecturers: [],
      statusItems: [
        { value: "interested", text: "Interested" },
        { value: "assigned", text: "Assigned" },
        { value: "associate", text: "Associate" },
        { value: "career_break", text: "Career Break" },
      ],
      errors: {},
    };
  },
  created() {
    document.title = "Enrolment Create";
  },
  mounted() {
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    createEnrolment() {
      console.log("Course ID:" + this.form.course_id);
      console.log("Lecturer ID:" + this.form.lecturer_id);
      let token = localStorage.getItem("token");
      axios
        .post(
          `https://college-api-mo.herokuapp.com/api/enrolments`,
          {
            status: this.form.status,
            course_id: this.form.course_id,
            lecturer_id: this.form.lecturer_id,
            date: this.form.date,
            time: this.form.time,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "enrolments_index" });
          this.displayEnrolmentSB();
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors;
        });
    },
    getCourses() {
      let token = localStorage.getItem("token");
      axios
        .get(`https://college-api-mo.herokuapp.com/api/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Courses: " + response.data.data);
          this.courses = response.data.data;
          //  this.courseItems.courseName = response.data.data.title
        })
        .catch((error) => console.log(error));
    },
    getLecturers() {
      let token = localStorage.getItem("token");
      axios
        .get(`https://college-api-mo.herokuapp.com/api/lecturers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Lecturers: " + response.data);
          this.lecturers = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    clear() {
      this.$refs.formR.resetValidation(),
        (this.form.status = ""),
        (this.form.course_id = ""),
        (this.form.lecturer_id = ""),
        (this.form.date = ""),
        (this.form.time = "");
    },
    displayEnrolmentSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "secondary",
        message: "Enrolment added to the database",
        timeout: "4000",
      });
    },
  },
};
</script>
<style scoped>
.errorText {
  color: red;
}
</style>
