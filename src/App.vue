<template>
  <v-app>
    <v-content class="background">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:ital,wght@1,700&display=swap");
.background {
  background-color: #2a2a2a;
}
</style>
