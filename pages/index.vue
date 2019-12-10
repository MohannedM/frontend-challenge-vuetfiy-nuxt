<template>
  <v-layout row align-center>
    <v-flex col v-for="(app, i) in apps" :key="i" xs12 sm6 md4 lg3>
      <v-card
      class="mx-auto my-12"
    >
      <v-img
        height="250"
        :src="app.icon"
      ></v-img>
  
      <v-card-title>{{app.title}}</v-card-title>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
  
          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>
  
        <div class="my-4 subtitle-1 black--text">
          $ • Italian, Cafe
        </div>
  
        <div>Small plates, salads & sandwiches an inteimate setting with 12 indoor seats plus patio seating.</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title>Tonight's availability</v-card-title>
  
      <v-card-text>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
          <v-chip>8:00PM</v-chip>
  
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>
  
      <v-card-actions>
        <v-btn
          color="deep-purple accent-4"
          text
        >
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-flex>
    <v-flex justify-center>
      <v-pagination
        :value="currentPage"
        @input="paginate($event)"
        class="my-4"
        :length="length"
      ></v-pagination>
    </v-flex>
  </v-layout>

</template>
<script>
import axios from 'axios'
export default{
  data(){
    return{

    }
  },
  methods:{
    paginate(page){
      this.$router.push(`/?page=${page}`);
    }
  },
  computed:{
    urlQuery(){
      return this.$route.query;
    }
  },
  watch:{
    urlQuery(){
      location.reload();
    }
  },
  asyncData(context){
    const currentPage = context.route.query.page || 1;
    const perPage = 8;
    return axios.get(`https://pushbots-fend-challenge.herokuapp.com/api/apps?take=${perPage}&skip=${(currentPage - 1) * perPage}&sortBy=title&direction=desc`, {
      headers:{
        Authorization: "Bearer " + context.store.getters.userToken
      }
    })
    .then(res=>{
      return {
        total: res.data.total,
        apps: res.data.data,
        perPage,
        currentPage: +currentPage,
        length: Math.ceil(res.data.total/perPage)
      }
    }).catch(err=>console.log(err));
  },
  middleware: 'is-auth'
}
</script>
