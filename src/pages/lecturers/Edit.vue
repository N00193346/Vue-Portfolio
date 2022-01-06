<template>
  <v-container class="my-5">
    <v-card>
      <v-card-title class="mb-1">
        <h1>Edit Lecturer</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="formR">
          <v-text-field
            label="Name"
            v-model="lecturer.name"
            prepend-icon="mdi-account"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.name }}</div>
          <v-text-field
            label="Address"
            v-model="lecturer.address"
            prepend-icon="mdi-home"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.address }}</div>
          <v-text-field
            type="Email"
            label="Email"
            v-model="lecturer.email"
            prepend-icon="mdi-email"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.email }}</div>
          <v-text-field
            label="Phone"
            v-model="lecturer.phone"
            prepend-icon="mdi-phone"
            :rules="inputRules"
          ></v-text-field>
          <div class="errorText">{{ errors.phone }}</div>
          <v-btn flat class="secondary mt-3" @click="editLecturer()"
            >Edit
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
  name: "LecturersEdit",
  components: {},
  data() {
    return {
      lecturer: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      inputRules: [(v) => v.length > 0 || "Cannot be empty"],
      errors: {},
    };
  },
  mounted() {
    this.getLecturer();
  },
  created() {
    document.title = "Lecturer Edit";
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
          this.lecturer.name = response.data.data.name;
          this.lecturer.address = response.data.data.address;
          this.lecturer.email = response.data.data.email;
          this.lecturer.phone = response.data.data.phone;
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
        });
    },
    editLecturer() {
      let token = localStorage.getItem("token");
      axios
        .put(
          `https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
          {
            name: this.lecturer.name,
            address: this.lecturer.address,
            email: this.lecturer.email,
            phone: this.lecturer.phone,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.displayLecturerSB();
          this.$router.push({ name: "lecturers_index" });
        })
        .catch((error) => {
          console.log(error);
          this.errors = error.response.data.errors;
        });
    },
    clear() {
      this.$refs.formR.resetValidation();
      (this.lecturer.name = ""),
        (this.lecturer.address = ""),
        (this.lecturer.email = ""),
        (this.lecturer.phone = "");
    },
    displayLecturerSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "accent",
        message: "Lecturer edited and saved to the database",
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
