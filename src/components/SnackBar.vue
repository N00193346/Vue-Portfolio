<template>
  <v-snackbar v-model="show" :color="data.color" :timeout="data.timeout" top>
    <span>{{ data.message }}</span>
    <v-btn :color="data.color" class="ml-3" @click="removeSnackbar()"
      >Close</v-btn
    >
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    show: Boolean,
    data: Object,
  },
  methods: {
    removeSnackbar() {
      this.data.show = false;
      this.$store.dispatch("displaySnackBar", this.data);
    },
  },
};
</script>

<style></style>
