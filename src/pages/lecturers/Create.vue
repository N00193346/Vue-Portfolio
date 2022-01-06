<template>
  <v-container class="my-5">
    <v-card>
      <v-card-title class="mb-1">
        <h1>Create Lecturer</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="formR">
          <v-text-field
            label="Name"
            v-model="form.name"
            prepend-icon="mdi-account"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.name }}</div>
          <v-text-field
            label="Address"
            v-model="form.address"
            prepend-icon="mdi-home"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.address }}</div>
          <v-text-field
            type="Email"
            label="Email"
            v-model="form.email"
            prepend-icon="mdi-email"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.email }}</div>
          <v-text-field
            type="Number"
            label="Phone"
            v-model="form.phone"
            prepend-icon="mdi-phone"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.phone }}</div>

          <v-btn flat class="secondary mt-3" @click="createLecturer()"
            >Create
          </v-btn>
          <v-btn flat class="accent ml-3 mt-3" @click="clear">Clear</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "CoursesCreate",
  components: {},
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      inputRules: [(v) => v.length > 0 || "Cannot be empty"],
      errors: {},
    };
  },
  created() {
    document.title = "Lecturer Create";
  },

  methods: {
    createLecturer() {
      if (this.$refs.formR.validate()) {
        let token = localStorage.getItem("token");
        axios
          .post(
            `https://college-api-mo.herokuapp.com/api/lecturers`,
            {
              name: this.form.name,
              address: this.form.address,
              email: this.form.email,
              phone: this.form.phone,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "lecturers_index" });
            this.displayLecturerSB();
          })
          .catch((error) => {
            console.log(error);
            this.errors = error.response.data.errors;
          });
      }
    },
    clear() {
      this.$refs.formR.resetValidation();
      (this.form.name = ""),
        (this.form.address = ""),
        (this.form.email = ""),
        (this.form.phone = "");
    },
    displayLecturerSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "secondary",
        message: "Lecturer added to the database",
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
