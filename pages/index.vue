<template>
    <div>
      <v-row align-center>
        <v-flex col v-for="(app, i) in apps" :key="i" xs12 sm6 md4>
          <v-card
      max-width="344"
      class="mx-auto"
    >
      <v-list-item>
        <img :src="app.icon" class="mr-4">
        <v-list-item-content>
          <v-list-item-title class="headline">{{app.title}}</v-list-item-title>
          <div>
            <p class="subtitle-2 grey--text ma-0 pa-0 float-left"><i class="fas fa-mobile-alt"></i> {{app.totalUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}&nbsp;users</p>
            <div buttom class="float-right">
              <v-btn icon>
                <i class="fas fa-share"></i>
              </v-btn>
              <v-btn icon small>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </div>

          </div>
          <div>
            <span v-for="(isPlat, platName, i) in app.platforms" :key="i" class="grey--text">
              <i class="fab fa-apple" v-if="(isPlat && platName === 'ios')"></i>
              <i class="fab fa-android"  v-if="(isPlat && platName === 'android')"></i>
              <i class="fab fa-chrome" v-if="(isPlat && platName === 'chrome')"></i>
              <i class="fab fa-firefox" v-if="(isPlat && platName === 'firefox')"></i>
              <i class="fab fa-opera" v-if="(isPlat && platName === 'opera')"></i>
              <i class="fab fa-safari" v-if="(isPlat && platName === 'safari')"></i>
            </span>
            
          </div>
        </v-list-item-content>
      </v-list-item>
  
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="teal"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :value="app.chartData"
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet>
        Daily active users
  
      <v-card-text>
        Visit ten places on our planet that are undergoing the biggest changes today.
      </v-card-text>
  
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Read
        </v-btn>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Bookmark
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
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
    const perPage = 5;
    return axios.get(`https://pushbots-fend-challenge.herokuapp.com/api/apps?take=${perPage}&skip=${(currentPage - 1) * perPage}&sortBy=title&direction=desc`, {
      headers:{
        Authorization: "Bearer " + context.store.getters.userToken
      }
    })
    .then(res=>{
      console.log(res.data)
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
