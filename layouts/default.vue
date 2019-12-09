<template>
  <v-app>
    <v-app-bar fixed flat app class="teal white--text">
      <nuxt-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <template v-if="!isLoggedIn">
        <nuxt-link to="/auth/login" tag="span">
          <v-btn text class="white--text">
            Login
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/auth/signup" tag="span">
          <v-btn text class="white--text">
            Signup
          </v-btn>
        </nuxt-link>
      </template>
      <template v-else>
        <v-btn text class="white--text">
            {{user.name}}
        </v-btn>
        <v-avatar>
        <img
          :src="user.avatar"
          :alt="user.name"
        >
      </v-avatar>
      <v-btn class="white--text" text>
        {{user.plan}}
      </v-btn>
        <v-btn text class="white--text" @click="logout">
          Logout
        </v-btn>
      </template>
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
export default {
  data() {
    return {
      title: 'PushBots Manager',
      fixed: true
    }
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
        this.$router.push('/auth/login');
      }).catch(err=>console.log(err));
    }
  },
  // created(){
  //   this.$store.dispatch('setAuth', true);
  // },
  middleware: 'set-auth'
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

</style>
