<template>
  <v-app>
    <v-app-bar fixed flat app class="teal white--text">
      <nuxt-link to="/" tag="span" style="cursor:pointer">
        <logo class="mr-4"></logo>
      </nuxt-link>
      <div class="input-container">
      <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-input" placeholder="Search your apps">
      </div>
      <v-spacer />
        <span class="body-1">
         <i class="fas fa-users"></i> {{user.totalDevices}}
        </span>
        &nbsp;
        &nbsp;
        <span class="body-1">
          <i class="fas fa-th"></i>
          {{user.totalApps}}
        </span>
        &nbsp;
        &nbsp;
              <div class="mr-2 body-1" align="center">
              <p class="ma-0 pa-0">{{user.name}}</p>
              <v-btn class="grey darken-3 white--text" rounded x-small>
                <i class="fas fa-crown"></i>
                &nbsp;
                {{user.plan}}
              </v-btn>
              </div>
            <v-avatar>
              <img
                :src="user.avatar"
                :alt="user.name"
              >
            </v-avatar>
            <v-menu bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
  
              <v-list>
                <v-list-item style="cursor:pointer;">
                  <v-list-item-title>Account Seetings</v-list-item-title>
                </v-list-item>
                <v-list-item style="cursor:pointer;">
                  <v-list-item-title @click="logout">Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as Cookies from 'js-cookie'
import Logo from './../components/logo'
export default {
  data() {
    return {
      fixed: true
    }
  },
  components:{
    Logo
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.isAuth;
    },
    user(){
      return this.$store.getters.userData;
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      .then(()=>{
        this.$router.push('/login');
      }).catch(err=>console.log(err));
    }
  }
}
</script>
<style>
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 1s;
    }
    .fade-leave-active{
        transition: opacity 1s;
        opacity: 0;
    }

    .input-container{
      border: 1px solid #009688;
      background-color: #26A69A;
      width: 35rem;
      height: 75%;
      border-radius: 10px;
      margin-left: 1.5rem ;
    }
    .search-input{
      outline: none;
      width: 90%;
      height: 100%;
      color: #fff;
      font-size: 1.5rem;
    }
    .search-input::placeholder{
      color: #fff;
      font-weight: 300;
    }
    .search-icon{
      display: inline-block;
      font-size: 2.2rem;
      padding: 5px 2px;
    }

</style>
