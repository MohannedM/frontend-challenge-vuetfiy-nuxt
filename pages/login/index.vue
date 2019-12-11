<template>
<div>
    <v-container>


        <v-row no-gutters style="height:90vh;" justify="center">
            <v-col align-self="center" cols="9">
                    <h3 class="headline mb-4">Login into your account</h3>
                    <v-spacer></v-spacer>
                    <v-form>
                        <v-text-field
                        v-model="email"
                        label="Your e-mail address"
                        prepend-inner-icon="mdi-email"
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
                        prepend-inner-icon="mdi-lock"
                        :error-messages="passwordErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.password.$touch()"
                        type="password"
                        :error="$v.password.$anyError"
                        required
                        ></v-text-field>
                    </v-form>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="$v.$invalid" @click="login" color="teal white--text" block>Login</v-btn>
                    <v-row no-gutters class="mt-4">
                        <v-col><v-btn class="red darken-4 white--text" block><i class="fab fa-google"></i> &nbsp; Google</v-btn></v-col>
                        <v-col><v-btn class="black white--text" block><i class="fab fa-github"></i>&nbsp; Github</v-btn></v-col>
                    </v-row>
                    

            </v-col>
        </v-row>

    </v-container>


    
</div>
</template>

<script>
import { required, email, minLength} from 'vuelidate/lib/validators'
export default {
  layout:'auth',
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
        alert("Please check your credentials and your internet connection!");
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
