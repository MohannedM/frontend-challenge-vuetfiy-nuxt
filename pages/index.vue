<template>
  <div>
    <v-row align-center>
      <v-flex col v-for="(app, i) in apps" :key="i" xs12 sm6 md4>
        <app-card :app="app"></app-card>
      </v-flex>
    </v-row>
    <v-col justify-center>
      <v-pagination
        :value="currentPage"
        @input="paginate($event)"
        class="my-4"
        :length="length"
      ></v-pagination>
    </v-col>
  </div>
</template>
<script>
import axios from "axios";
import appCard from './../components/card';
export default {
  data() {
    return {};
  },
  methods: {
    paginate(page) {
      this.$router.push(`/?page=${page}`);
    }
  },
  components: {
    appCard
  },
  computed: {
    urlQuery() {
      return this.$route.query;
    }
  },
  watch: {
    urlQuery() {
      location.reload();
    }
  },
  asyncData(context) {
    const currentPage = context.route.query.page || 1;
    const perPage = 5;
    return axios
      .get(
        `https://pushbots-fend-challenge.herokuapp.com/api/apps?take=${perPage}&skip=${(currentPage -
          1) *
          perPage}&sortBy=title&direction=desc`,
        {
          headers: {
            Authorization: "Bearer " + context.store.getters.userToken
          }
        }
      )
      .then(res => {
        return {
          total: res.data.total,
          apps: res.data.data,
          perPage,
          currentPage: +currentPage,
          length: Math.ceil(res.data.total / perPage)
        };
      })
      .catch(err => console.log(err));
  },
  middleware: "is-auth"
};
</script>
