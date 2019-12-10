<template>
  <v-layout column justify-center>
    <v-card class="elevation-12 mr-4">
      <v-toolbar flat>
        <v-toolbar-title class="teal--text">Login form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="emailErrors"
              type="email"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              :error="$v.email.$anyError"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :error-messages="passwordErrors"
              @input="$v.email.$touch()"
              @blur="$v.password.$touch()"
              type="password"
              :error="$v.password.$anyError"
              required
            ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="$v.$invalid" @click="login" color="teal white--text">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import { required, email, minLength} from 'vuelidate/lib/validators'
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {email: this.email, password: this.password})
      .then(()=>{
        this.$router.push("/");
      })
      .catch(err=>{
        console.log(err)
      });
    }
  },
  computed:{
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must be at least 5 characters')
      return errors
    }
  },
  validations:{
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(5)
    }
  }
};
</script>
