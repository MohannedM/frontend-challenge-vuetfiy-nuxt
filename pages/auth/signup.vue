<template>
  <v-layout column justify-center>
    <v-card class="elevation-12 mr-4">
      <v-toolbar flat>
        <v-toolbar-title class="teal--text">Signup form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.name"
            label="Name"
            type="text"
          ></v-text-field>
        <v-text-field
            v-model="user.email"
            label="Email"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            type="password"
          ></v-text-field>
            <v-text-field
            v-model="user.confirmPassword"
            label="Confirm Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login" color="teal white--text">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return { user: { name: "", email: "", password: "", confirmPassword: "" } };
  },
  methods: {
    login() {
      alert("login was pesed");
    }
  }
};
</script>
