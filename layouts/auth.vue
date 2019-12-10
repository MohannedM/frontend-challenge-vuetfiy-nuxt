<template>
    <v-app>
        <v-layout row>
            <v-flex col xs6 class="teal">
                <logo class="ml-2 mt-2"></logo>
            </v-flex>
            <v-flex col xs6>
                <nuxt />
            </v-flex>

        </v-layout>
    </v-app>
</template>
<script>
import Logo from './../components/logo'
export default{
    components:{
        Logo
    }
}
</script>