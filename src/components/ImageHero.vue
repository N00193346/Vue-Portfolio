<template>
   <v-container fluid>
    <v-row justify="space-around">
      <v-col cols="5">
        <v-img
          :src="heroImage"
          width= 100%;
          height="350"
          class=" ma-3"
        />
      </v-col>
    </v-row>
   </v-container>
</template>

<script>
   export default {
        name: "Hero",
        props: {
           heroImage: String,
        },
    };
</script>
<style scoped>

</style>