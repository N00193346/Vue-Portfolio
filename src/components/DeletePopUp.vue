<template>
  <div class="text-center">
    <v-dialog width="600">
      <template v-slot:activator="{ on }">
        <v-btn
          outlined
          rounded
          text
          color="white"
          class="buttonDelete button pa-5"
          dark
          v-on="on"
          >Delete</v-btn
        >
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="error grey" primary-title>{{
            button.message
          }}</v-card-title>
          <v-card-actions class="d-flex error justify-center">
            <v-btn
              @click="dialog.value = false"
              outlined
              rounded
              text
              color="white"
              class="buttonEdit button pa-5"
            >
              No
            </v-btn>

            <v-btn
              @click="deleteItem()"
              outlined
              rounded
              text
              color="white"
              class="buttonDelete button pa-5"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "DeletePopUp",
  props: {
    button: Object,
    enrolments: Array,
    type: String,
  },
  data() {
    return {
      errors: "",
    };
  },
  methods: {
    deleteEnrolments() {
      for (var i = 0; i < this.enrolments.length; i++) {
        let token = localStorage.getItem("token");
        axios
          .delete(
            `https://college-api-mo.herokuapp.com/api/enrolments/${this.enrolments[i].id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response);
            console.log(`Enrolment ${this.enrolments[i].id} deleted`);
          })
          .catch((error) => {
            console.log(error);
            this.errors = error.response.data.status;
          });
      }
    },
    deleteItem() {
      //If a lecturer or course has enrolments, the enrolments must be deleted first
      if (this.enrolments.length > 0) {
        this.deleteEnrolments();
      }
      let token = localStorage.getItem("token");
      axios
        .delete(
          `https://college-api-mo.herokuapp.com/api/${this.type}s/${this.button.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(`${this.type} deleted`);
          this.$router.push({ name: `${this.type}s_index` });
          this.displayDeletedSB();
        })
        .catch((error) => {
          console.log(error);
          //  localStorage.removeItem('token')
          this.errors = error.response.data.status;
        });
    },
    displayDeletedSB() {
      this.$store.dispatch("displaySnackBar", {
        show: true,
        color: "error",
        message: `${this.type} deleted`,
        timeout: "4000",
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

.errorText {
  color: red;
}

.errorMessage {
  overflow: hidden;
  white-space: initial;
}
</style>
