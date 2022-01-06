<template>
  <div>
    <v-container class="my-5">
      <v-card>
        <v-card-title class="mb-1">
          <h1>Edit Course</h1>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="formR">
            <v-text-field
              label="Title"
              v-model="course.title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>
            <div class="errorText">{{ errors.title }}</div>
            <v-text-field
              label="Code"
              v-model="course.code"
              prepend-icon="mdi-code-braces"
              :rules="codeRules"
            ></v-text-field>
            <div class="errorText">{{ errors.code }}</div>
            <v-textarea
              label="Description"
              v-model="course.description"
              prepend-icon="edit"
              :rules="inputRules"
            ></v-textarea>
            <div class="errorText">{{ errors.description }}</div>
            <v-text-field
              type="number"
              label="Points"
              v-model="course.points"
              prepend-icon="mdi-chart-line"
              :rules="numberRules"
            ></v-text-field>
            <div class="errorText">{{ errors.points }}</div>
            <v-text-field
              type="number"
              label="Level"
              v-model="course.level"
              prepend-icon="mdi-equalizer"
              :rules="numberRules"
            ></v-text-field>
            <div class="errorText">{{ errors.level }}</div>
            <v-btn flat class="secondary mt-3" @click="editCourse()"
              >Edit
            </v-btn>
            <v-btn flat class="accent ml-3 mt-3" @click="clear">Clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'
import axios from "axios";

export default {
  name: "CoursesEdit",
  components: {},
  data() {
    return {
      course: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },

      //   inputRules: [
      //     v => v.length > 0 || 'Cannot be empty'
      //   ],
      // numberRule: v  => {
      //   if (!v.trim()) return true;
      //   return 'Cannot be empty';
      // },
      errors: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
    };
  },
  mounted() {
    this.getCourse(this.$route.params.id);
  },
  created() {
    document.title = "Course Edit";
  },

  methods: {
    getCourse() {
      let token = localStorage.getItem("token");
      axios
        .get(
          `https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          this.course.title = response.data.data.title;
          this.course.code = response.data.data.code;
          this.course.description = response.data.data.description;
          this.course.points = response.data.data.points;
          this.course.level = response.data.data.level;
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          //  this.$emit('invalid-token')
        });
    },
    editCourse() {
      let token = localStorage.getItem("token");
      axios
        .put(
          `https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
          {
            title: this.course.title,
            code: this.course.code,
            description: this.course.description,
            points: this.course.points,
            level: this.course.level,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.displayCourseSB();
          this.$router.push({ name: "courses_index" });
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors;
        });
    },

    clear() {
      this.$refs.formR.resetValidation(),
        (this.course.title = ""),
        (this.course.code = ""),
        (this.course.description = ""),
        (this.course.points = ""),
        (this.course.level = "");
    },
    displayCourseSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "accent",
        message: "Course edited and saved to the database",
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
