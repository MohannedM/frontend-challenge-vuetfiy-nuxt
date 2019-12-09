<template>
  <v-layout column justify-center align-center>
    <h1>Hello</h1>
  </v-layout>
</template>
<script>
export default{
  middleware: ['set-auth','is-auth']
}
</script>
