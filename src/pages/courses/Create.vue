<template>
  <div>
    <v-container class="my-5">
      <v-card>
        <v-card-title class="mb-1">
          <h1>Create Course</h1>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="formR">
            <v-text-field
              label="Title"
              v-model="form.title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>
            <div class="errorText">{{ errors.title }}</div>
            <v-text-field
              label="Code"
              v-model="form.code"
              prepend-icon="mdi-code-braces"
              :rules="codeRules"
            ></v-text-field>
            <div class="errorText">{{ errors.code }}</div>
            <v-textarea
              label="Description"
              v-model="form.description"
              prepend-icon="edit"
              :rules="inputRules"
            ></v-textarea>
            <div class="errorText">{{ errors.description }}</div>
            <v-text-field
              type="number"
              label="Points"
              v-model="form.points"
              prepend-icon="mdi-chart-line"
              :rules="inputRules"
            ></v-text-field>
            <div class="errorText">{{ errors.points }}</div>
            <v-text-field
              type="number"
              label="Level"
              v-model="form.level"
              prepend-icon="mdi-equalizer"
              :rules="inputRules"
            ></v-text-field>
            <div class="errorText">{{ errors.level }}</div>
            <v-btn flat class="secondary mt-3" @click="createCourse()"
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
  name: "CoursesCreate",
  components: {},
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      inputRules: [(v) => v.length > 0 || "Cannot be empty"],
      codeRules: [
        (v) => v.length > 0 || "Cannot be empty",
        (v) => v.length < 6 || "Code cannot be greater than 5 characters",
      ],
      errors: {},
    };
  },
  created() {
    document.title = "Course Create";
  },

  methods: {
    createCourse() {
      if (this.$refs.formR.validate()) {
        let token = localStorage.getItem("token");
        axios
          .post(
            `https://college-api-mo.herokuapp.com/api/courses`,
            {
              title: this.form.title,
              code: this.form.code,
              description: this.form.description,
              points: this.form.points,
              level: this.form.level,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "courses_index" });
            this.displayCourseSB();
          })
          .catch((error) => {
            console.log(error);
            this.errors = error.response.data.errors;
          });
      }
    },
    clear() {
      this.$refs.formR.resetValidation(),
        (this.form.title = ""),
        (this.form.code = ""),
        (this.form.description = ""),
        (this.form.points = ""),
        (this.form.level = "");
    },
    displayCourseSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "secondary",
        message: "Course added to the database",
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
