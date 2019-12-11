<template>
  <v-app>
    <v-row>
      <v-col xs6 class="teal">
        <logo class="ml-2 mt-2"></logo>
      </v-col>
      <v-col xs6>
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import Logo from "./../components/logo";
export default {
  components: {
    Logo
  }
};
</script>