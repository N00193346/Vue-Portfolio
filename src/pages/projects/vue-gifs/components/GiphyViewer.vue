<template>
  <div>
    <div class="search-box">
      <input
        type="text"
        style="
          border: 1px solid #d8d8d8;
          background-color: #ffffff;
          margin: 20px;
        "
        placeholder="Search"
        v-model="term"
        v-on:keyup.enter="searchGiphy()"
      />
      <b-button class="float-end" variant="primary" @click="trendingGiphy()"
        >Trending</b-button
      >
      <b-button
        class="buttonMargin float-end"
        variant="primary"
        @click="randomGiphy()"
        >Random</b-button
      >
      <b-button
        class="buttonMargin float-end"
        variant="primary"
        @click="searchGiphy()"
        >Search</b-button
      >
    </div>

    <b-card-group columns>
      <b-card
        v-for="gif in gifs"
        :key="gif.id"
        :img-src="gif.images.fixed_width.url"
      >
        <b-card-text>
          <a :href="gif.url" target="_blank">{{ gif.title }}</a>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import axios from "axios";
const API_KEY = "DHBB9fly7G28uAUsm5ZyixCi3PmHtGMf";
const GIPHY_URL = "https://api.giphy.com/v1/gifs";
export default {
  name: "GiphyViewer",
  data() {
    return {
      gifs: [],
      term: "",
    };
  },
  mounted() {
    this.trendingGiphy();
  },

  methods: {
    searchGiphy() {
      if (!this.term) {
        //    this.$bvToast.toast('Please enter a search term!', {
        //     title: 'Warning',
        //     variant: 'danger',
        //     toaster: 'b-toaster-top-center',
        //     autoHideDelay: 5000,
        //     solid: true
        alert("Please enter a search term");
        return;
      }

      axios
        .get(`${GIPHY_URL}/search?api_key=${API_KEY}&q=${this.term}&limit=20`)
        .then((response) => {
          console.log(response.data.data);
          this.gifs = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    trendingGiphy() {
      axios
        .get(`${GIPHY_URL}/trending?api_key=${API_KEY}`)
        .then((response) => {
          console.log(response.data.data);
          this.gifs = response.data.data;
        })
        .catch((error) => console.log(error));
    },
    randomGiphy() {
      axios
        .get(`${GIPHY_URL}/random?api_key=${API_KEY}`)
        .then((response) => {
          console.log(response.data.data);
          this.gifs = [response.data.data];
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
.buttonMargin {
  margin-right: 20px;
}

.search-box {
  margin-top: 20px;
  margin-bottom: 20px;
}

.card {
  margin-bottom: 20px;
}

@media (min-width: 34em) {
  .card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media (min-width: 48em) {
  .card-columns {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}
@media (min-width: 62em) {
  .card-columns {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
}
@media (min-width: 75em) {
  .card-columns {
    -webkit-column-count: 5;
    -moz-column-count: 5;
    column-count: 5;
  }
}
</style>
