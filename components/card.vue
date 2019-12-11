<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <img :src="app.icon" class="mr-4" />
      <v-list-item-content>
        <v-list-item-title class="headline">{{ app.title }}</v-list-item-title>
        <div>
          <p class="subtitle-2 grey--text ma-0 pa-0 float-left">
            <i class="fas fa-mobile-alt"></i>
            {{
              app.totalUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}&nbsp;users
          </p>
          &nbsp;
          <span
            v-for="(isPlat, platName, i) in app.platforms"
            :key="i"
            class="grey--text"
          >
            <i class="fab fa-apple" v-if="isPlat && platName === 'ios'"></i>
            <i
              class="fab fa-android"
              v-if="isPlat && platName === 'android'"
            ></i>
            <i class="fab fa-chrome" v-if="isPlat && platName === 'chrome'"></i>
            <i
              class="fab fa-firefox"
              v-if="isPlat && platName === 'firefox'"
            ></i>
            <i class="fab fa-opera" v-if="isPlat && platName === 'opera'"></i>
            <i class="fab fa-safari" v-if="isPlat && platName === 'safari'"></i>
          </span>
          <div buttom class="float-right">
            <v-btn icon>
              <i class="fas fa-share"></i>
            </v-btn>
            <v-btn icon small>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="teal lighten-2"
      max-width="100%"
      tile
    >
      <v-sparkline
        :value="values"
        :labels="labels"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>
    <v-layout justify-center class="mt-4">
      <span class="teal--text">
        <i class="fas fa-square "></i>
      </span>
      &nbsp;
      <p class="body-2">Daily active users</p>
    </v-layout>
    <span>

    </span>
    <v-card-text>
      <v-btn icon large>
        <i class="fas fa-paper-plane"></i>
      </v-btn>
      <v-btn icon large>
        <i class="fas fa-history"></i>
      </v-btn>
      <v-btn icon large>
        <i class="fas fa-mobile-alt"></i>
      </v-btn>
      <v-btn icon large>
        <i class="fas fa-users"></i>
      </v-btn>
      <v-btn icon large>
        <i class="fas fa-cog"></i>
      </v-btn>
      <v-btn icon large>
        <i class="fas fa-chart-area"></i>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props:{
        app:{
            required: true,
            type: Object
        }
    },
    computed:{
        values(){
            return this.app.chartData.map(el=>el.value);
        },
        labels(){
            return this.app.chartData.map(el=>{
                const dateObj = new Date(el.label);
                const month = dateObj.getUTCMonth() + 1; 
                const day = dateObj.getUTCDate();
                return month + '-' + day;
            });
        }        
    },
    mounted(){
        console.log(this.values)
    }
}
</script>